const jwt = require('jsonwebtoken');

// Middleware for token verification
const authenticateToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
    }
  
    // Token format: Bearer <token>
    const [bearer, token] = authHeader.split(' ');
  
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Authorization header format' });
    }
  
    // Verify the JWT token
    jwt.verify(token, 'KTU-1955', (err, decoded) => {
      if (err) {
        // Handle token verification error
        console.error('Token verification error:', err.message);
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
  
      // Add the decoded payload to the request object for later use
      req.user = decoded;
  
      // Continue to the next middleware or route handler
      next();
    });
  };



module.exports = authenticateToken;