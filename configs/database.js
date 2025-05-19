const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect("mongodb://localhost:27017/food-order");
        console.log("Connect database success");
    }catch(error){
        console.log("Connect database fail: ", error.message);
    }
}
module.exports = connectDB;