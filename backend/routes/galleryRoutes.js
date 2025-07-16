const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Gallery = require("../models/Gallery");

// Image upload config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/gallery";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Get all gallery items
router.get("/", async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gallery items" });
  }
});

// ✅ Get single item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Create new gallery item with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/gallery/${req.file.filename}` : "";

    const newItem = new Gallery({ title, description, imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: "Failed to create gallery item" });
  }
});

// ✅ Update gallery item (image optional)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const updateData = {
      title,
      description,
      imageUrl: req.file ? `/uploads/gallery/${req.file.filename}` : item.imageUrl,
    };

    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update" });
  }
});

// ✅ Delete gallery item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // Optionally delete image file from disk
    if (item.imageUrl) {
      const filePath = path.join(__dirname, "..", item.imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Failed to delete image:", err.message);
      });
    }

    await item.deleteOne();
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
