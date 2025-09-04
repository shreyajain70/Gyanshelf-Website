const mongoose = require('mongoose');

const ConnectDB = async()=>{
    try{
await mongoose.connect("mongodb+srv://gyanshelf:gyanshelf@cluster0.jojraag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
console.log("DataBase Connected Successfully")
    }
    catch(err){
        console.log("DataBase is not connected")
    }
}

module.exports = ConnectDB;