const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = { userId: decoded.userId || decoded.id };
    next();
  });
}

module.exports = authenticateToken;
