require('dotenv').config();
let url = process.env.url
const mongoose=require("mongoose")

const connect=async()=>{
    await mongoose.connect(url)
    console.log("mongodb connected");
}
module.exports=connect