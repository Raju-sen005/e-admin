const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
   date: {
    type: Date,
    default: Date.now, // ✅ This sets the date to current time when order is created
  },
  categories: [String], // array to support multiple categories
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
