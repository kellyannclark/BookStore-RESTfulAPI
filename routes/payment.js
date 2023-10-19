const express = require("express");
const router = express.Router();

const paymentController = require('../controllers/payment.js');

router.get('/', paymentController.getPayments);
router.get('/id:', paymentController.getPayments);
router.post("/", paymentController.createPayment);
router.put("/:id", paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;