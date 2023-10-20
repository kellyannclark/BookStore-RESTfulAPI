const express = require("express");
const router = express.Router();

const bookStoreController = require('../controllers/bookStore.js');

router.get('/', bookStoreController.getBookStores);
router.get('/id:', bookStoreController.getBookStore);
router.post("/", bookStoreController.createBookStore);
router.put("/:id", bookStoreController.updateBookStore);
router.delete("/:id", bookStoreController.deleteBookStore);

module.exports = router;