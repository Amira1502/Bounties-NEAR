// require mongoose 
const mongoose = require("mongoose")

// schema
const {Schema} = mongoose

//  user schema
const userSchema = new Schema({
    name : String,
    githubId : String
})
const userDev = mongoose.model('userDev',userSchema)

module.exports = userDev