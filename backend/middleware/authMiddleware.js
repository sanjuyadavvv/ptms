import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id)
      .populate({
        path: "role",
        populate: {
          path: "default_permissions",
        },
      });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    console.log('user is ',user.name)

    if (user.is_active === "DEACTIVATE") {
      return res.status(403).json({
        success: false,
        message: "Account deactivated",
      });
    }

    req.user = user; // 🔥 yahin se power aati hai
    next();
  } catch (error) {
    console.log('error aa rha h auth mei ',error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
