const seatPrice = require("../seatPrice.js");
const Booking = require("../models/booking.js");
const Seats = require("../models/seat.js");
const sendMail = require("../sendgrid.js");

exports.createBooking = async (req, res) => {
  console.log(req.body);
  try {
    const bookedSeats = await Seats.find({
      is_booked: true,
      seat_identifier: { $in: req.body.selected_seats },
    });
    if (bookedSeats.length > 0) {
      return res.json({
        message: `Some of the seats are already booked. Please select some other seats`,
      });
    }

    const bookingObj = {
      seat_ids: req.body.selected_seats,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
    };
    const bookingAmount = await getBookingAmount(req.body.selected_seats);
    bookingObj.total_amount = bookingAmount;
    const CreatedBooking = await Booking.create(bookingObj);
    sendMail({
      to: req.body.email,
      from: "sagarkumar1952115@gmail.com",
      subject: "Booking Confirmed",
      html:
        "Congratulations!!!, your tickets has been booked<br>Booking_id:" +
        a1._id +
        "<br>Total Amount:" +
        bookingAmount,
    });
    res.status(200).json({
      data: {
        bookingId: CreatedBooking?.id,
        totalAmount: bookingAmount,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.retrieveBooking = async (req, res) => {
  try {
    const seats = await Booking.find({ phone: req.query.userIdentifier });
    console.log(req.query.userIdentifier, seats);
    res.json(seats);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const getBookingAmount = async (selected_seats) => {
  let amount = 0;

  for (let i = 0; i < selected_seats.length; i++) {
    const seat = await Seats.findOne({ seat_identifier: selected_seats[i] });

    const { seat_class } = seat;
    const allSeatsInClass = await Seats.find({ seat_class });

    const SeatsPreviouslyBooked = allSeatsInClass.filter(
      (seat) => seat?.is_booked === true
    );
    const total_seats = allSeatsInClass.length;
    const bookings_count = SeatsPreviouslyBooked.length;

    const occupancy_percentage = (bookings_count / total_seats) * 100;
    var seatAmount = 0;

    if (occupancy_percentage < 40) {
      if (seat.min_price != "") {
        seatAmount = seat.min_price;
      } else {
        seatAmount = seat.normal_price;
      }
    } else if (occupancy_percentage >= 40 && occupancy_percentage <= 60) {
      if (seat.normal_price != "") {
        seatAmount = seat.normal_price;
      } else {
        seatAmount = seat.max_price;
      }
    } else {
      if (seat.max_price != "") {
        seatAmount = seat.max_price;
      } else {
        seatAmount = seat.normal_price;
      }
    }
    seat.is_booked = true;
    await seat.save();
    seatAmount = Number(seatAmount.split("$")[1]);
    amount += seatAmount;
  }

  return amount;
};
