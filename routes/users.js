const express = require("express");
const router = express.Router();

const usersController = require('../controllers/users.js');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post("/", isAuthenticated, usersController.createUser);
router.put("/:id", isAuthenticated, usersController.updateUser);
router.delete("/:id", isAuthenticated, usersController.deleteUser);

module.exports = router;