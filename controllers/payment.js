

const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getPayments = async (req, res) => {
    //#swagger.tags=["Authors"]
    const result = await mongodb.getDatabase().db().collection("payments").find();
    result.toArray().then((payment) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(payment);
    });
}

const getPayment = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("paymets").find({_id: userId});
    result.toArray().then((payment) => {
        if (payment.length > 0) {
            const payment= payment[0];
            res.status(200).json({ payment});
        } else {
            res.status(404).json("payment not found");
        }
    });
};


const createPayment= async (req, res) => {
    //#swagger.tags=["Book"]
    const payment = {
        userName: req.body.userName,
        amount: req.body.amount,
        paymentMethod:req.body.paymentMethod,
        paymentDate:req.body.paymentDate
    };
    const response = await mongodb.getDatabase().db().collection("payment").insertOne(payment);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the payment.");
    }
};

const updatePayment = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const payment= {
        userName: req.body.userName,
        amount: req.body.amount,
        paymentMethod:req.body.paymentMethod,
        paymentDate:req.body.paymentDate
    };

    const response = await mongodb.getDatabase().db().collection("payment").replaceOne({ _id: userId } ,payment);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the payment.");
        };
}  

const deletePayment = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting payment with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("payment").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("payment not found");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
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