const jwt = require('jsonwebtoken')

const routeProtector = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Cookie token in routeProtector:", token ? "Present" : "Missing");
  try {
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded userId:", decoded.id);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = routeProtector;
