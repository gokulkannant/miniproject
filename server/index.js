const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const teacherModel = require("./models/teachers");
const PairModel = require("./models/pairs");
// const Room = require("./models/rooms");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/teacher");

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  teacherModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  teacherModel
    .create(req.body)
    .then((teachers) => res.json(teachers))
    .catch((err) => res.json(error));
});
app.post("/uploadData", async (req, res) => {
  if (req.body.key == "abdu") {
    PairModel.replaceOne({}, {"classes": req.body.data.classes})
      .then((x) => res.json({ data: "uploaded" }))
      .catch((err) => {
        res.json({ data: "error" });
        console.log(err);
      });
  } else {
    res.json({ data: "wrongKey" });
  }
});

app.get("/getData",(req,res)=>{
    PairModel.findOne().then((x)=>{res.json({classes:x.classes})})
    // res.json({

    // })
})
app.listen(3001, () => {
  console.log("server is running");
});
