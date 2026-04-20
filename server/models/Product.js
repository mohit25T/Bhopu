import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches', 'Brooches']
  },
  desc: {
    type: String,
    trim: true
  },
  image: {
    type: String, // Base64 string or URL
    default: 'https://via.placeholder.com/400?text=New+Jewelry'
  },
  isSoldOut: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
