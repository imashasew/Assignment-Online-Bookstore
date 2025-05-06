// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;
