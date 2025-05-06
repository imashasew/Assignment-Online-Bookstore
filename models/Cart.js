const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  username: String,
  items: [
    {
      bookId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
