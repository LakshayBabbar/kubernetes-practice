import { Router } from "express";

const router = Router();

router.get("/api/data", (req, res) => {
  try {
    return res.status(200).json({ host: process.env.MONGO_HOST });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/api/data", async (req, res) => {
  try {
    const { data } = await req.body;
    if (!data) {
      return res.status(400).json({ message: "Data is required" });
    }
    return res.status(200).json({ message: "Data created successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
