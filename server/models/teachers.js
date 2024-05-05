const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const teacherModel = mongoose.model("teachers",teacherSchema)
module.exports = teacherModel