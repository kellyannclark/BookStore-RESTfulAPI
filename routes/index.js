const router = require('express').Router();

router.use("/", require("./swagger"));
router.use("/book", require("./book")); 
router.use("/bookStore", require("./bookStore"));
router.use("/users", require("./users"));

module.exports = router;
