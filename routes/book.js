const express = require("express");
const router = express.Router();

const bookController = require('../controllers/book.js');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.post("/", isAuthenticated,bookController.createBook);
router.put("/:id", isAuthenticated,bookController.updateBook);
router.delete("/:id", isAuthenticated,bookController.deleteBook);

module.exports = router;