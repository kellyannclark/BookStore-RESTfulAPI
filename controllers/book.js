

const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getBooks = async (req, res) => {
    //#swagger.tags=["Book"]
    const result = await mongodb.getDatabase().db().collection("book").find();
    result.toArray().then((book) => {
       res.setHeader("Content-Type", "application/json");
       res.status(200).json(book);
    });
}

const getBook = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("book").find({_id: userId});
    result.toArray().then((book) => {
        if (book.length > 0) {
            const book = book[0];
            res.status(200).json({ book });
        } else {
            res.status(404).json("Book not found");
        }
    });
};


const createBook = async (req, res) => {
    //#swagger.tags=["Book"]
    const bookData = req.body;
    
    // validation
    if (!bookData.title || !bookData.author || !bookData.genre) {
        return res.status(400).json("Title, author, and genre are required.");
    }

    // Validate numeric fields
    const numericFields = ['publication_year', 'isbn', 'price'];
    for (const field of numericFields) {
        if (bookData[field] !== undefined && isNaN(bookData[field])) {
            return res.status(400).json(`${field} must be a number.`);
        }
    }

    // Proceed to create the book
    const book = {
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre,
        publication_year: parseInt(bookData.publication_year),
        isbn: parseInt(bookData.isbn),
        publisher: bookData.publisher,
        price: parseInt(bookData.price)
    };

    const response = await mongodb.getDatabase().db().collection("book").insertOne(book);

    if (response.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the book.");
    }
};


const updateBook = async (req, res) => {
    //#swagger.tags=["Book"]
    const userId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publication_year: parseInt(req.body.publication_year),
        isbn: parseInt(req.body.isbn),
        publisher: req.body.publisher,
        price: parseInt(req.body.price)

    };

    const response = await mongodb.getDatabase().db().collection("book").replaceOne({ _id: userId } ,book);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the book.");
        };
}  

const deleteBook = async (req, res) => {
    //#swagger.tags=["Book"]
    try {
      const userId = new ObjectId(req.params.id);
      console.log("Deleting book with ID:", userId); // line for debugging
      const response = await mongodb.getDatabase().db().collection("book").deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json("book not found");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json("Some error occurred while deleting the book.");
    }
  };
  


module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};