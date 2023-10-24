

const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getPayments = async (req, res) => {
    //#swagger.tags=["Payments"]
    const result = await mongodb.getDatabase().db().collection("payments").find();
    result.toArray().then((payments) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(payments);
    });
}

const getPayment = async (req, res) => {
    //#swagger.tags=["Payments"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("payments").find({_id: userId});
    result.toArray().then((payments) => {
        if (payments.length > 0) {
            const payments= payments[0];
            res.status(200).json({ payments});
        } else {
            res.status(404).json("payment not found");
        }
    });
};


const createPayment= async (req, res) => {
    //#swagger.tags=["Payments"]

    const { userName, amount, paymentMethod, paymentDate } = req.body;

    // validation
    if (!userName || !amount || !paymentMethod || !paymentDate) {
      return res.status(400).json('Invalid data. All fields are required.');
    }
    const payment = {
        userName: req.body.userName,
        amount: req.body.amount,
        paymentMethod:req.body.paymentMethod,
        paymentDate:req.body.paymentDate
    };
    const response = await mongodb.getDatabase().db().collection("payments").insertOne(payment);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the payment.");
    }
};



const updatePayment = async (req, res) => {
  try {
    //#swagger.tags=["Payments"]
    const userId = req.params.id;

    // Check if the userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json("Invalid user ID.");
    }

    
    const payment = {
      userName: req.body.userName,
      amount: req.body.amount,
      paymentMethod: req.body.paymentMethod,
      paymentDate: req.body.paymentDate,
    };

    const response = await mongodb.getDatabase().db().collection("payments").replaceOne(
      { _id: new ObjectId(userId) },
      payment
    );

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    } else {
      return res.status(500).json(response.error || "Some error occurred while updating the payment.");
    }
  } catch (error) {
    console.error("Error updating payment:", error);
    return res.status(500).json("Some error occurred while updating the payment.");
  }
};


const deletePayment = async (req, res) => {
    //#swagger.tags=["Payments"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting payment with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("payments").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("payment not found");
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json("Some error occurred while deleting the payment.");
    }
  };
  


module.exports = {
    getPayments,
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
};