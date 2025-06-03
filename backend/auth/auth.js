const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Must match secret used in login
    req.user = decoded; // Now req.user.id and req.user.role are available
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};


module.exports = auth;
