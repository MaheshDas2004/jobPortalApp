const jwt=require('jsonwebtoken')

const routeProtector = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Cookie token:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:", decoded);
    req.userId = decoded.id;
    next();
  } catch (err) {
    // Silently handle - user is not authenticated
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = routeProtector;
