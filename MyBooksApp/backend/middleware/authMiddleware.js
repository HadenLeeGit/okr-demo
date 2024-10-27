const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
module.exports = async (req, res, next) => {

    // Get token from header
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: 'Authorization denied' });
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
