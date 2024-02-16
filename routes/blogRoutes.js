const express = require('express');
const { getAllBlogs, createBlog, updateBlog, getBlog, deleteBlog, getUserBlogs } = require('../controllers/blogControllers');

// route object
const router = express.Router();

// get blog | GET
router.get('/all-blogs', getAllBlogs);

// create blog | POST
router.post('/create-blog',createBlog);

// update blog | PUT
router.put('/update-blog/:id',updateBlog);

// single blog | GET
router.get('/blog/:id',getBlog);

// delete blog | DELETE
router.delete('/delete-blog/:id', deleteBlog);

// user blogs | GET
router.get('/user-blogs/:id',getUserBlogs);


module.exports = router;
