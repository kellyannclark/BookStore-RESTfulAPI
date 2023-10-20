const router = require('express').Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    //#swagger.tags = ["Hello World"]
    res.send("Hello World");
}); // GET request and responds with Hello World

router.use("/book", require("./book")); 
router.use("/bookStore", require("./bookStore"));
router.use("/users", require("./users"));
router.use("/payment",require("./payment"));

module.exports = router;








