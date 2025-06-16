const express = require('express');
const router = express.Router();
const { createMomoPayment } = require('../controllers/momo.controller'); // Đúng tên, đúng đường dẫn

router.post('/create_momo_payment', createMomoPayment); // handler phải là function

module.exports = router;
