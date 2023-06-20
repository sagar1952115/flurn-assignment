const express = require("express");
const { createBooking, retrieveBooking } = require("../controllers/booking.js");
const router = express.Router();
router.post("/", createBooking);
router.get("/", retrieveBooking);

module.exports = router;
