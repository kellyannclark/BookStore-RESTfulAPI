
const express = require("express");
const router = express.Router();
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;


const user1Route = (req, res) => {
    res.send(" Hello User1");
};

const user2Route = (req, res) => {
    res.send(" Hello User2");
};

module.exports = {
    user1Route,
    user2Route,
};