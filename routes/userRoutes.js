const express =require('express');
const { getAllUsers, registerUser, loginUser } = require('../controllers/userControllers');


// route object
const router = express.Router();

// get all user | GET
router.get('/all-users', getAllUsers);

// create user | POST
router.post('/register',registerUser);

// login user | POST
router.post('/login',loginUser); 

module.exports = router;