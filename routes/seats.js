const express = require("express");
const { getAllSeats, getSeatPricing } = require("../controllers/seats.js");
const router = express.Router();
router.get("/", getAllSeats);
router.get("/:id", getSeatPricing);

module.exports = router;
