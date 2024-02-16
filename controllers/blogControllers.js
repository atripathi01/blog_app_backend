const blogModel= require('../models/blogModel');
const userModel = require('../models/userModels');
const mongoose = require('mongoose')

// getAllBlogs controller
exports.getAllBlogs = async function(req,res) {

    try{
       const blogs = await blogModel.find({}).populate('user');
       if(!blogs){
        return res.status(200).send({
            message:'No Blogs found',
            success:false
        })
       }
       return res.status(200).send({
        message:"Blogs found",
        success:true,
        blogs
       })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Error in get all blogs",
            success:false
        })
    }
};

// createBlog controller
exports.createBlog = async function(req,res) {

    try{

        const {title, description,content, image, user} = req.body;

        if(!title || !description || !content || !image || !user){ 
            return res.status(400).send({
                message:'please fill all fields',
                success:false
            })
        }

        const existingUser = await userModel.findById(user);

        //validation
        if(!existingUser){
            return res.status(404).send({
                message:"unable to find user",
                success:false
            })
        }

        const blog = new blogModel({title, description,content,image, user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session}); 
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();

        await blog.save();
        return res.status(200).send({
            message:'blog created successfully',
            success:true,
            blog 
        })

    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:'Error in Create blog',
            success:false,
            err
        })
    }
};

// getBlog controller
exports.getBlog = async function(req,res) {

    try{

        const {id}= req.params;
        if(!id){
            return res.status(401).send({
                message:"Please provide valid id",
                success:false
            })
        }
        const blog = await blogModel.findById(id);

        if(!blog){
            return res.status(400).send({
                message:"No blog found",
                success:false
            })
        }
        return res.status(200).send({
            message:"blog found",
            success:true,
            blog
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            message:"Error in get blog",
            success:false,
            err
        })

    }
};

// updateBlog controller
exports.updateBlog =async function(req,res) {

    try{

        const {id}=req.params;
        const {title,description,image}=req.body;

        if(!id){
            return res.status(400).send({
                message:'Please provide valid id',
                success:false
            })
        }

        const updateBlog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        if(!updateBlog){
            return res.status(400).send({
                message:'blog no found',
                success:false
            })
        }

        return res.status(200).send({
            message:"blog updated",
            success:true,
            updateBlog
        })

    }catch(err){
        console.log(err);
        return res.status(400).send({
            message:'Error in update the blog',
            success:false,
            err
        })
    }
};

// deleteBlog controller
exports.deleteBlog =async function(req,res) {

    try{

        const {id}= req.params;

        if(!id){
            return res.status(400).send({
                message:'Please provide valid id',
                success:false
            })
        }
        
        const deleteBlog = await blogModel.findByIdAndDelete(id).populate('user');

        if(!deleteBlog){
            return res.status(400).send({
                message:'blog no found',
                success:false
            })
        }

        await deleteBlog.user.blogs.pull(deleteBlog);
        await deleteBlog.user.save(); 


        return res.status(200).send({
            message:"blog deleted",
            success:true
        })


    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Error in blog delete",
            success:false,
            err
        })
    }
};

// getUserBlogs controller
exports.getUserBlogs= async function(req, res){

    try{

        const {id} = req.params;

        const userBlogs = await userModel.findById(id).populate('blogs');

        if(!userBlogs){
            return res.status(400).send({
                message:'blog no found',
                success:false
            })
        }

        return res.status(200).send({
            message:"user blogs found",
            success:true,
            userBlogs
        })

    }catch(err){
        console.log(err);
        res.status(500).send({
            message:"Error in get user blogs",
            success:false,
            err
        })
    }

}