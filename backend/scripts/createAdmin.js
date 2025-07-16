// scripts/createAdmin.js
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

mongoose.connect("mongodb+srv://rajugbp2006:FVDzdIUx0GxhkGR9@cl.hckfuh7.mongodb.net/e-zone?retryWrites=true&w=majority");

async function createAdmin() {
  const adminExists = await Admin.findOne({ email: "pharmacyperfect20@gmail.com" });
  if (adminExists) {
    console.log("Admin already exists");
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const newAdmin = new Admin({
    email: "pharmacyperfect20@gmail.com",
    password: hashedPassword,
  });

  await newAdmin.save();
  console.log("✅ Permanent Admin Created");
  mongoose.disconnect();
}

createAdmin();
