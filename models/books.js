const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  category: String,
  price: Number,
  rating: Number,
  image: String,
}, { collection: "books" }); // ✅ Explicitly link to your "books" collection

module.exports = mongoose.model("Book", bookSchema);
