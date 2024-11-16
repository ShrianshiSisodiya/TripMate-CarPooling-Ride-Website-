const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Access the JWT from the cookie
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to req object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
