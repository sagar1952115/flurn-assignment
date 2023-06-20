const Seats = require("./models/seat.js");
const seatPrice = async (seat, seat_identifier) => {
  /* Percentage of seat booked. */
  const class_of = await Seats.find({ seat_class: seat.seat_class });
  console.log(class_of.length);
  const booked_by_class = await Seats.find({
    seat_class: seat.seat_class,
    is_booked: true,
  });
  console.log(booked_by_class);
  const percentage = (booked_by_class.length / class_of.length) * 100;
  var price = 0;
  /* Get price value according to percentage */
  if (percentage < 40) {
    if (seat.min_price != "") {
      price = seat.min_price;
    } else {
      console.log(percentage);
      price = seat.normal_price;
    }
  } else if (percentage > 40 && percentage < 60) {
    if (seat.normal_price != "") {
      price = seat.normal_price;
    } else {
      price = seat.max_price;
    }
  } else {
    if (seat.max_price != "") {
      price = seat.max_price;
    } else {
      price = seat.normal_price;
    }
  }
  console.log(price);
  return price;
};

module.exports = seatPrice;
