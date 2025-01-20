const express = require("express");
const mongoose = require("mongoose");
const { User, Accounts } = require("../db");
const { userAuth, authMiddleware } = require("../middlewares/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

mongoose.connect(
  "mongodb+srv://rohankumar6143:89VfFukDblCAyAL4@cluster0.57rhuig.mongodb.net/paytm"
);

const userRouter = express.Router();

userRouter.post("/signup", userAuth, async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
  });
  var hashedPassword = await newUser.createHash(req.body.password);
  newUser.password_hash = hashedPassword;

  const newAccount = new Accounts({
    userId: newUser._id,
    balance: Math.floor(Math.random()*10000+1)
  })
  await newUser.save();
  await newAccount.save();
  const token = jwt.sign(String(newUser._id), JWT_SECRET);
  return res.status(201).json({
    message: "User created successfully",
    token: token,
  });
});

userRouter.post("/signin", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  if (await user.validatePassword(req.body.password)) {
    const token = jwt.sign(String(user._id), JWT_SECRET);
    return res.status(200).json({
      token: token,
    });
  } else {
    return res.status(411).json({
      message: "Incorrect password",
    });
  }
});

userRouter.put("/", authMiddleware, async (req, res) => {
    console.log("Hii ")
  try {
    const user = await User.findOne({ username: req.userId });
    const password = req.body.password;
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    if (password) {
      var hashedPassword = await user.createHash(password);
      user.password_hash = hashedPassword;
    }
    if (fName) {
      user.firstName = fName;
    }
    if (lName) {
      user.lastName = lName;
    }
    await user.save();
    return res.status(200).json({
      message: "User updated successfully",
    });

  } catch (err) {
    res.status(411).json({
      message: "Error updating user",
    });
  }
});

userRouter.get("/bulk",async (req, res) => {
    const filter = req.query.filter
    // console.log(filter); 
    const regex = new RegExp(filter,"i")
    const users = await User.find({$or:[{firstName: regex},{lastName: regex}]}, "firstName lastName");
    console.log(users);
    return res.status(200).json({
        users:users
    })
})

module.exports = userRouter;
