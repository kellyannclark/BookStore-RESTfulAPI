
const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const book1Route = (req, res) => {
    res.send(" Hello Book1");
};

const book2Route = (req, res) => {
    res.send(" Hello Book2");
};

module.exports = {
    book1Route,
    book2Route,
};