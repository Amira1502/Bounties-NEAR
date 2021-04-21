// require mongoose
const mongoose = require('mongoose')

// schema
const schema = mongoose.Schema

const projectSchema = new schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
   
})

module.exports = Project = mongoose.model('project', projectSchema)