import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await req.cookies?.authToken;
    if (!token) {
      return res.status(401).json({ error: "Access denied" });
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (err: any, decoded: JwtPayload | any) => {
        if (err) {
          return res.status(401).json({ error: "Invalid token" });
        }
        const { userId } = decoded as JwtPayload;
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(400).json({ error: "User not found" });
        }
        res.locals.user = user;
        next();
      }
    );
  } catch (error) {
    res.locals.user = null;
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
