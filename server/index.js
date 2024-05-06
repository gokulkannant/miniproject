const express = require("express")
const mongoose  = require("mongoose")
const cors = require("cors")
const teacherModel = require('./models/teachers')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://143.110.252.141:27017/teacher")

app.post('/login', (req, res) => {
    const {email, password} =req.body;
    teacherModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } 
            else {
                res.json("The password is incorrect")
            }
        } 
        else {
            res.json("No record existed")
        }
    })

})

app.post('/register',(req, res) => {
    teacherModel.create(req.body)
    .then(teachers => res.json(teachers))
    .catch(err => res.json(error))
})

app.listen(3001, () => {
    console.log("server is running")
})