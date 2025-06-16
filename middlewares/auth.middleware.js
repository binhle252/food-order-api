const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  console.log("🔐 [authenticateToken] Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token không được cung cấp" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ [authenticateToken] Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(
      "❌ [authenticateToken] Error verifying token:",
      error.message
    );
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    console.log("🔒 [authorizeRole] Required roles:", roles);
    console.log("👤 [authorizeRole] User role:", req.user?.role);

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Không có quyền truy cập" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
