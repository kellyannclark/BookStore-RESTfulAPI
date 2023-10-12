
const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getUsers = async (req, res) => {
    //#swagger.tags=["Authors"]
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(users);
    });
}

const getUser= async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("users").find({_id: userId});
    result.toArray().then((users) => {
        if (authors.length > 0) {
            const user = user[0];
            res.status(200).json({user});
        } else {
            res.status(404).json("user not found");
        }
    });
};


const createUser = async (req, res) => {
    //#swagger.tags=["Book"]
    const bookStore = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publication_year: parseInt(req.body.publication_year),
        isbn: parseInt(req.body.isbn),
        publisher: req.body.publisher,
        price: parseInt(req.body.price)
    };
    const response = await mongodb.getDatabase().db().collection("users").insertOne(user);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the bookStore.");
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const user = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publication_year: parseInt(req.body.publication_year),
        isbn: parseInt(req.body.isbn),
        publisher: req.body.publisher,
        price: parseInt(req.body.price)

    };

    const response = await mongodb.getDatabase().db().collection("users").replaceOne({ _id: userId } ,bookStore);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user.");
        };
}  

const deleteUser = async (req, res) => {
    //#swagger.tags=["Authors"]
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


