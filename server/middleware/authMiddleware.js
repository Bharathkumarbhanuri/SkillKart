const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ✅ now req.user is available everywhere
        next();
    } catch (err) {
        return res.status(401).json({ message: "Session expired. Please log in again." });return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
