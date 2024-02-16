const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// env config
dotenv.config();

// import router 
const userRoutes =require('./routes/userRoutes.js');
const blogRoutes =require('./routes/blogRoutes.js');

//db connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);


const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server connected at ${port}`)
});