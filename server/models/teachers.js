const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    email: String,
    password: String
})

const teacherModel = mongoose.model("teachers",teacherSchema)
module.exports = teacherModel