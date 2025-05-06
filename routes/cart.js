const express = require('express');
const router = express.Router();
router.post("/add", async (req, res) => {
  const { username, bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, items: [{ bookId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Book added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/add", async (req, res) => {
  const { username, bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ username });

    if (!cart) {
      cart = new Cart({ username, items: [{ bookId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ bookId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Book added to cart", cart });
  } catch (err) {
    console.error("Cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const cart = await Cart.findOne({ username }).populate("items.bookId");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json({ cart });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router; 

