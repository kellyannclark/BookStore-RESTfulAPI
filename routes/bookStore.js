const express = require("express");
const router = express.Router();

const bookStoreController = require('../controllers/bookStore.js');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', bookStoreController.getBookStores);
router.get('/:id', bookStoreController.getBookStore);
router.post("/", isAuthenticated,bookStoreController.createBookStore);
router.put("/:id", isAuthenticated,bookStoreController.updateBookStore);
router.delete("/:id", isAuthenticated,bookStoreController.deleteBookStore);

module.exports = router;