const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      message: "Access denied. Authorization header is missing.",
      error: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ 
      message: "Access denied. Bearer token is missing.",
      error: "Unauthorized"
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add more robust token verification
    if (!verified.id || !verified.email) {
      return res.status(403).json({ 
        message: "Invalid token structure.",
        error: "Forbidden"
      });
    }

    req.user = verified; 
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Token has expired.",
        error: "Unauthorized"
      });
    }
    
    return res.status(403).json({ 
      message: "Invalid token.",
      error: "Forbidden"
    });
  }
};

module.exports = authenticateToken;