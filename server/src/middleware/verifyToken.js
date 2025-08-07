import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Unathorized-no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Unathorized-Invalid token provided",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
