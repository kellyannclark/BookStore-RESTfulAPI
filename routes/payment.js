const express = require("express");
const router = express.Router();

const paymentController = require('../controllers/payment.js');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', paymentController.getPayments);
router.get('/:id', paymentController.getPayment);
router.post("/", isAuthenticated, paymentController.createPayment);
router.put("/:id", isAuthenticated, paymentController.updatePayment);
router.delete("/:id", isAuthenticated, paymentController.deletePayment);

module.exports = router;