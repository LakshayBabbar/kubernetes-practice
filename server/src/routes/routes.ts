import { Router } from "express";
import userModel from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { auth } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = Router();

router.get("/api/user", auth, (req, res) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Fill all the required fields" });
    }
    const user = new userModel({ name, email, password });
    await user.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error, ${(error as any)?.message}` });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = await req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the required fields" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (isPasswordValid === false) {
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error, ${(error as any)?.message}` });
  }
});

router.post("/api/logout", (req, res) => {
  try {
    res.cookie("authToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 0,
    });
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error, ${(error as any)?.message}` });
  }
});

router.get("/api/auth", auth, (req, res) => {
  try {
    return res.status(200).json({ isAuth: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", isAuth: false });
  }
});

export default router;
