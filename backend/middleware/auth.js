// Import jsonwebtoken library to work with JWT (create/verify tokens)
const jwt = require('jsonwebtoken');

// Load environment variables from .env file (e.g., JWT_SECRET)
require('dotenv').config();

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {

  // Get the Authorization header from the request (e.g., "Bearer TOKEN")
  const authHeader = req.headers['authorization'];

  // If no Authorization header is provided, return 401 (Unauthorized)
  if (!authHeader) 
    return res.status(401).json({ message: 'No token provided' });

  // Extract the token part from "Bearer TOKEN"
  // Split by space → ["Bearer", "TOKEN"] → take index [1]
  const token = authHeader.split(' ')[1]; // ["Bearer", "eyJhbGciOiJIUzI1Ni..."]

  // If token is missing after splitting, return 401
  if (!token) 
    return res.status(401).json({ message: 'Token missing' });

  try {
    // Verify the token using the secret key from .env
    // If valid → returns decoded payload (user info)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user data to request object
    // So it can be used in protected routes
    req.user = decoded;

    // Call next() to pass control to the next middleware or route
    next();

  } catch (err) {
    // If token is invalid or expired → return 403 (Forbidden)
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Export the middleware so it can be used in other files
module.exports = verifyToken;