const express = require('express');
const userRouter = require('./user');
const mongoose = require("mongoose");
const { User, Accounts } = require("../db");
const accountsRouter = require('./accounts');


const router = express.Router();

router.use("/user", userRouter);
router.use("/account",accountsRouter)
module.exports = router