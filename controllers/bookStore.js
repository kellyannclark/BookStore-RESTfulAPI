

const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getbookStores = async (req, res) => {
    //#swagger.tags=["Authors"]
    const result = await mongodb.getDatabase().db().collection("bookStore").find();
    result.toArray().then((bookStore) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(bookStore);
    });
}

const getbookStore= async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("bookStore").find({_id: userId});
    result.toArray().then((bookStore) => {
        if (authors.length > 0) {
            const book = bookStore[0];
            res.status(200).json({ bookStore });
        } else {
            res.status(404).json("BookStore not found");
        }
    });
};


const createbookStore = async (req, res) => {
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
    const response = await mongodb.getDatabase().db().collection("bookStore").insertOne(bookStore);
    if (response.acknowledged > 0) {
        res.status(204).send();
     } else {
        res.status(500).json(response.error || "Some error occurred while updating the bookStore.");
    }
};

const updatebookStore = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const bookStore = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publication_year: parseInt(req.body.publication_year),
        isbn: parseInt(req.body.isbn),
        publisher: req.body.publisher,
        price: parseInt(req.body.price)

    };

    const response = await mongodb.getDatabase().db().collection("bookStore").replaceOne({ _id: userId } ,bookStore);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the bookStore.");
        };
}  

const deletebookStore = async (req, res) => {
    //#swagger.tags=["Authors"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting bookStore with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("bookStore").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("bookStore not found");
      }
    } catch (error) {
      console.error("Error deleting bookStore:", error);
      res.status(500).json("Some error occurred while deleting the bookStore.");
    }
  };
  


module.exports = {
    getbookStores,
    getbookStore,
    createbookStore,
    updatebookStore,
    deletebookStore,
};