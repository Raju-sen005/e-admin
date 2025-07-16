const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const blogRoutes = require('./routes/blogRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const productRoutes = require('./routes/productRoutes');
const galleryRoutes = require("./routes/galleryRoutes");
const adminAuthRoutes = require('./routes/adminAuth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('Mongo Error:', err));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
