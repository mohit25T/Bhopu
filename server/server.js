import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from './models/Product.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Serve static files from the React app (dist folder)
const distPath = path.join(__dirname, '../dist');

// Check if build exists
import fs from 'fs';
if (!fs.existsSync(distPath)) {
  console.warn('⚠️  Warning: dist folder not found. Please run "npm run build" first.');
}
app.use(express.static(distPath));

// Database Connection Logic (Run in background)
let isDbConnected = false;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('❌ CRITICAL: MONGO_URI is missing from environment variables!');
    return;
  }

  try {
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    isDbConnected = true;
    console.log('✅ Connected to MongoDB Atlas Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Failure:', err.message);
  }
};

// API Check Middleware
app.use('/api', (req, res, next) => {
  if (!isDbConnected && req.path !== '/health') {
    return res.status(503).json({ 
      error: 'Database is still waking up...', 
      message: 'Please wait a few seconds and refresh.' 
    });
  }
  next();
});

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new product
app.post('/api/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    desc: req.body.desc,
    image: req.body.image,
    isSoldOut: req.body.isSoldOut || false
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update product
app.patch('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Health Check
app.get('/api/health', (req, res) => res.json({ 
  status: isDbConnected ? 'active' : 'maintenance', 
  db: isDbConnected ? 'connected' : 'disconnected'
}));

// Catch-all route
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('<h3>Bhopu Jewels: Build files not found!</h3>');
  }
});

// START SERVER IMMEDIATELY (Prevents 502)
app.listen(PORT, () => {
  console.log(`🚀 Server active on port ${PORT}`);
  connectDB(); // Connect to DB in background
});

// Global Shield
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
