require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const router = express.Router();

const booksRoute = require('./routes/books');
const cartRoute = require('./routes/cart');
const ordersRoute = require('./routes/orders');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));


// MongoDB URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@imasha.ghgeg.mongodb.net/project1?retryWrites=true&w=majority&appName=imasha`;

// Connect to MongoDB using mongoose (removed deprecated options)
mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// User schema (optional — if you need to interact with users through MongoDB native driver)
const userCollection = mongoose.connection.collection("user");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await userCollection.findOne({ username });
    if (userExists) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await userCollection.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userCollection.findOne({ username });
    if (!user) return res.status(400).json({ message: "Username not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Incorrect password" });

    res.status(200).json({ message: "Login successful", username });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// Books, Cart, and Order routes
app.use('/api/books', booksRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', ordersRoute);

router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // fetch from MongoDB
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
});


function addToCart(bookId) {
  const username = "student01"; // Replace with actual user logic
  const quantity = 1;

  fetch("http://localhost:4400/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, bookId, quantity })
  })
    .then(res => res.json())
    .then(data => {
      alert("Book added to cart!");
      console.log(data);
    })
    .catch(err => {
      console.error("Failed to add to cart:", err);
    });
}


// server.js



const Order = require('./models/Cart');
const bodyParser = require('body-parser');


// POST route to add items to the cart
app.post('/add-to-cart', async (req, res) => {
  const { userId, items } = req.body;
  let totalPrice = 0;

  // Calculate total price based on items in the cart
  items.forEach(item => {
    totalPrice += item.price * item.quantity; // Assuming each item has a 'price' field
  });

  const newOrder = new Order({
    userId,
    items,
    totalPrice
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order added successfully', order: savedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add order' });
  }
});




const PORT = 4400; 
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/home.html`));

module.exports = router;