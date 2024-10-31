// middleware/auth.js

import jwt from 'jsonwebtoken';

// Protected route
export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = decoded; // Store decoded user info in request
        next(); // Call the next middleware or route handler
    });
};
