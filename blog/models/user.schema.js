const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})
const user=mongoose.model("userblog",userSchema)
module.exports=user