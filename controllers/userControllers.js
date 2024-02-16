const userModel= require('../models/userModels');
const bcrypt = require('bcrypt');


// get all users
exports.getAllUsers = async function(req, res) {
    // Add your logic to retrieve all users and send response

    try{
        const users =  await userModel.find({});
        return res.status(200).send({
            success:true,
            message:'All user data',
            users
        })
    }catch(err){
        console.log(err);
        return res.status(500).send({
            message:'Error in get all users',
            success:false,
            err
        })
    }
};

// create user
exports.registerUser = async function(req, res) {
    // Add your logic to register a user and send response

    try{
       const {username,password,email} = req.body;

       //validation
       if(!username || !email || !password){
        return res.status(400).send({
            message:'Please fill all fields',
            success:false,
        })
       }
        
       // check existing user 
       const existingUser = await userModel.findOne({email});

       if(existingUser){
        return res.status(401).send({
            message:'User already exist ',
            success:false,
        })
       }

       const hashedPassword = await bcrypt.hash(password,10);


       //register user
       const user = await new userModel({username, email, password: hashedPassword}).save();
       return res.status(201).send({
        message:'User created successfully',
        success:true,
        user
       })

    }catch(err){
       console.log(err);
       return res.status(500).send({
        message:'Error in register callback',
        success:false,
        err
       })
    }
};

// login user
exports.loginUser = async function(req, res) {
    // Add your logic to login a user and send response

    try{
        const {email,password}= req.body;

        // validation
        if(!email || !password){
            return res.status(400).send({
                message:"Please fill all fields",
                success:false
            })
        }
        
        // check user 
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).send({
                message:'email is not registered',
                success:false
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).send({
                message:'Invalid email or password',
                success:false
            })
        }

        return res.status(200).send({
            message:"User successfully logged",
            success:true,
            user
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            message:"Error in login user",
            success:false,
            err
        })
    }
};
