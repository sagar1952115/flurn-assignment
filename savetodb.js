const csv = require("csvtojson");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("Reading CSV...");

const seatData = [];
const seatPriceData = [];

csv()
  .fromFile("seats.csv")
  .then((rows) => {
    seatData.push(...rows);
    console.log("Seats.csv successfully read.");

    csv()
      .fromFile("seatPricing.csv")
      .then((rows) => {
        seatPriceData.push(...rows);
        console.log("SeatPricing.csv successfully read.");

        console.log("Merging CSV...");

        const mergedData = seatData.map((seat) => {
          const matchingPrice = seatPriceData.find(
            (price) => price.seat_class === seat.seat_class
          );
          return { ...seat, ...matchingPrice, is_booked: false };
        });

        console.log("CSV merged.");

        console.log("Uploading to database...");

        const mongoURI = process.env.MONGO_URL;

        mongoose
          .connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => {
            console.log("Connected to MongoDB successfully.");

            const Seat = mongoose.model(
              "Seat",
              new mongoose.Schema({
                seat_identifier: {
                  type: String,
                  unique: true,
                  required: true,
                },
                seat_class: {
                  type: String,
                  required: true,
                },
                min_price: {
                  type: String,
                },
                max_price: {
                  type: String,
                },
                normal_price: {
                  type: String,
                },
                is_booked: {
                  type: Boolean,
                  default: false,
                },
              })
            );
            console.log(mergedData);
            Seat.insertMany(mergedData)
              .then(() => {
                console.log("Data uploaded to MongoDB successfully.");
              })
              .catch((err) => {
                console.error("Error inserting data into MongoDB:", err);
              });

            // mongoose.disconnect();
          })
          .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
          });
      });
  });
