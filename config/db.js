const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB connected successfully`);
    }catch(error){
        console.log(`Connection error - ${error}`);
    }

}

module.exports = connectDB;