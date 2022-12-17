require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.port || 5000;

app.use(express.json());
app.use(cors());

const DB =
  "mongodb+srv://Gagan_Saini:gaganiscoder@cluster0.afqpweg.mongodb.net/Impact?retryWrites=true&w=majority";
// mongoose.connect("mongodb://localhost:27017/impactDB");
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log("Not connected to database " + err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  useremail: String,
});

const User = new mongoose.model("deployuser", userSchema);

app.get("/", (req, res) => {
  res.send("HI");
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const useremail = req.body.useremail;
  const newUser = new User({
    username: username,
    useremail: useremail,
  });

  newUser.save();
  res.status(200);
  const msg = "Account created";
  res.send({ msg });
});

app.get("/findAllUsers", (req, res) => {
  User.find({}, function (err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      const users = foundUsers;
      res.send({ users });
    }
  });
});

app.listen(PORT, function () {
  console.log("Server is running");
});
