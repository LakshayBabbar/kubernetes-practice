import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
import bodyParser from "body-parser";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();
const allowedOrigins = [process.env.ORIGIN];
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
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
