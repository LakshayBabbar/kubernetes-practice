import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(router);
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "Hello World" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDB();
});
