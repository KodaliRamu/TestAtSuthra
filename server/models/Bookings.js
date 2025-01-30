const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  clientMobile: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  products: [
    {
      category: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      numberOfPieces: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Bookings", bookingsSchema);
