const Book = require('../models/Book');

// Get all books
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find({ userId: req.user.id });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single book
exports.addBook = async (req, res) => {
    try {
        const { title, author, isbn, category } = req.body;
        const book = new Book({ title, author, isbn, category, userId: req.user.id });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add a new book
exports.updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, isbn, category } = req.body;
        const book = await Book.findOneAndUpdate({ _id: id, userId: req.user.id }, { title, author, isbn, category }, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a book
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOneAndDelete({ _id: id, userId: req.user.id });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
