import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("could not get correct authHeader");
    return;
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      "success": false,
      "error": "Unauthorized, token missing of invalid",
    });
    return;
  }

  try {
    const { userId, role } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;
    req.userId = userId;
    req.role = role;
    
    next();
  } catch (e) {
    res.status(401).json({
      "success": false,
      "error": "Unauthorized, token missing of invalid",
    });
  }
};
