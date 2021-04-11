// require mongoose 
const mongoose = require("mongoose")

// schema
const {Schema} = mongoose

//  user schema
const userSchema = new Schema({
    name :  String,
    googleId : String,
})

const userEmp = mongoose.model('userEmp',userSchema)

module.exports = userEmp