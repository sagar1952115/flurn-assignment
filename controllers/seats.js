const Seats = require("../models/seat.js");
const seatPrice = require("../seatPrice.js");

exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seats.find();
    console.log(seats);
    res.json(seats);
  } catch (err) {
    console.log(err);
  }
};

exports.getSeatPricing = async (req, res) => {
  try {
    const seat = await Seats.findOne({ seat_identifier: req.params["id"] });
    // console.log(seat);
    const price = await seatPrice(seat, req.params["id"]);
    const is_booked = seat.is_booked;

    // console.log(price);
    res.json({
      seat_identifier: req.params["id"],
      price: price,
      is_booked: is_booked,
    });
  } catch (err) {
    console.log(err);
  }
};
