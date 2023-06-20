const mongoose = require("mongoose");

const booking = new mongoose.Schema({
  seat_ids: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("booking", booking);
