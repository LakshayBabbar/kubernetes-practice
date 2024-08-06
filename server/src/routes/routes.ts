import { Router } from "express";

const router = Router();

router.get("/api/data", (req, res) => {
  try {
    return res.status(200).json({ message: "Data" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
