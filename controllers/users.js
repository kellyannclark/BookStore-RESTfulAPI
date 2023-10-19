
const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getUsers = async (req, res) => {
    //#swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(users);
    });
}

const getUser= async (req, res) => {
    //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({_id: userId});
    result.toArray().then((users) => {
        if (users.length > 0) {
            const user = user[0];
            res.status(200).json({user});
        } else {
            res.status(404).json("user not found");
        }
    });
};


const createUser = async (req, res) => {
    //#swagger.tags=["Users"]
    const bookStore = {
        userName: req.body.userName,
        passWord: req.body.passWord,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,

    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the bookStore.");
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
        userName: req.body.userName,
        passWord: req.body.passWord,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,

    };

    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId } ,users);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        };
}  

const deleteUser = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting user with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("users").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("user not found");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json("Some error occurred while deleting the user.");
    }
  };
  


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};


