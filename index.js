const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen("8080", () => {
      console.log("connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const seats = require("./routes/seats.js");
const booking = require("./routes/booking.js");

app.use("/seats/", seats);
app.use("/booking/", booking);
