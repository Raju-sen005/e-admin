const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");

// Get all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch enquiries" });
  }
});

// Optionally: Create enquiry (for frontend form submissions)
router.post("/", async (req, res) => {
  const { name, email, subject, phone, message } = req.body;
  try {
    const newEnquiry = new Enquiry({ name, email, subject, phone, message });
    await newEnquiry.save();
    res.status(201).json(newEnquiry);
  } catch (err) {
    res.status(400).json({ message: "Failed to save enquiry" });
  }
});

// Optionally: Delete enquiry
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete enquiry" });
  }
});

module.exports = router;
