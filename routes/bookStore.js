const express = require("express");
const router = express.Router();

const bookStoreController = require('../controllers/bookStore.js');

router.get('/', bookStoreController.getbookStore);
router.get('/id:', bookStoreController.getbookStore);
router.post("/", bookStoreController.createbookStore);
router.put("/:id", bookStoreController.updatebookStore);
router.delete("/:id", bookStoreController.deletebookStore);

module.exports = router;