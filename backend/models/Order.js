const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: String,
  date: {
    type: Date,
    default: Date.now, // ✅ This sets the date to current time when order is created
  },
  city: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
