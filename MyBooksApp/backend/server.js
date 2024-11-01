const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import routes
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
