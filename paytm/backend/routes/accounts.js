const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middlewares/user");
const { Accounts,User } = require("../db");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const accountsRouter = express.Router();
mongoose.connect(
    MONGO_URI
);

accountsRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
      // Fetch account details
      console.log("USERID",req.userId)
      const account = await Accounts.findOne({
        userId: req.userId,
      });
  
      if (!account) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      // Fetch user details from Users table
      const user = await User.findOne({
        _id: req.userId,
      });
  
      if (!user) {
        return res.status(404).json({
          message: "User details not found",
        });
      }
  
      // Respond with combined data
      res.status(200).json({
        balance: account.balance.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (err) {
      console.error("Error fetching balance:", err);
      res.status(500).json({
        message: "Failed to fetch balance",
        error: err.message,
      });
    }
  });
  

accountsRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction({
        readConcern: { level: "snapshot" },
        writeConcern: { w: "majority" },
      });
  
      const fromUser = await Accounts.findOne({
        userId: req.userId,
      }).session(session);
  
      const amount = req.body.amount;
      const toUser = await Accounts.findOne({
        userId: req.body.to,
      }).session(session);
  
      if (!toUser) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Invalid receiver's account",
        });
      }
  
      if (req.userId === req.body.to) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Cannot transfer to the same account",
        });
      }
  
      if (!fromUser || amount <= 0 || amount > fromUser.balance) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Invalid amount or insufficient balance",
        });
      }
  
      await Accounts.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);
  
      await Accounts.updateOne(
        { userId: toUser.userId },
        { $inc: { balance: amount } }
      ).session(session);
  
      await session.commitTransaction();
      return res.status(200).json({
        message: "Transfer Success",
      });
    } catch (err) {
      console.error("Transaction error:", err); // Log full error stack
      await session.abortTransaction();
      res.status(500).json({
        message: "Transaction failed",
        error: err.message,
      });
    } finally {
      session.endSession();
    }
  });
  
  

module.exports = accountsRouter;
