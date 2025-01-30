const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Bookings = require("./models/Bookings");

const app = express();

// Removed the JWT secret key and related logic

mongoose
  .connect("mongodb://localhost:27017/Usersdatabase")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(cors());
app.use(express.json());

// Bookings Route (No Authentication Required)
app.post("/api/bookings", (req, res) => {
  try {
    console.log("REQ BODY ::", req.body);
    const { clientName, clientAddress, clientMobile, clientEmail, products } =
      req.body;

    const booking = new Bookings({
      clientName,
      clientAddress,
      clientMobile,
      clientEmail,
      products,
    });

    booking
      .save()
      .then(() => {
        res.status(200).json({
          message: "Bookings added successfully",
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Bookings not added",
          error: err.message,
        });
      });
  } catch (err) {
    res.status(401).json({
      message: "Bookings not added",
      error: err.message,
    });
  }
});

// Fetch all bookings
app.get("/api/bookings", (req, res) => {
  Bookings.find().then((data) => {
    res.status(200).json({
      message: "Bookings fetched successfully",
      bookings: data,
    });
  });
});

// Dashboard Route
app.get("/api/dashboard", (req, res) => {
  Bookings.find().then((data) => {
    const totalClients = data.length;
    let totalBookings = 0;
    for (let i = 0; i < data.length; i++) {
      totalBookings += data[i].products.length;
    }
    res.status(200).json({
      totalBookings,
      totalClients,
    });
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
