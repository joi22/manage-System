const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Check for token presence and Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Decode token (make sure JWT_SECRET is set correctly in your .env)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = decoded;

    // Proceed to the next middleware/route
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message); // Log the actual error

    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
