const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
