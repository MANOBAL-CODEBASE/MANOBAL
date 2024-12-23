const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('manobal'); // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'No token provided, access denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        req.user = decoded; // Attach user info to the request object
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
