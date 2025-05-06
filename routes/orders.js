const express = require('express');
const router = express.Router();

let orders = [];

// POST: Place an order
router.post('/', (req, res) => {
  const { customer, items, total } = req.body;
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const order = { orderId, customer, items, total, status: 'Processing' };
  orders.push(order);
  res.status(201).json({ orderId, message: 'Order placed successfully' });
});

// GET: All orders
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
