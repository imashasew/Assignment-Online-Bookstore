const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// GET all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST new book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  const savedBook = await book.save();
  res.status(201).json(savedBook);
});

// PUT update book
router.put('/:id', async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

// DELETE book
router.delete('/:id', async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  res.json(deletedBook);
});

module.exports = router;
