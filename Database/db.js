const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://abimran222:1001kaka1001@cluster0.po9j7.mongodb.net/crudReactHaseeb?retryWrites=true&w=majority"
const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongoes successfully");
    })
}

module.exports = connectToMongo; 