import express from "express";
import router from "./src/routes/api.js";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// Security Middlewares
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser
app.use(bodyParser.json());

// Rate Limit Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

// MongoDB Connection
let URI = "mongodb://127.0.0.1:27017/CollectionName";
let OPTION = { autoIndex: true };
mongoose
  .connect(URI, OPTION)
  .then(() => console.log("Database Connected Success"))
  .catch((error) => console.log(error));

// Routes
app.use("/api/v1", router);

// 404 Route
app.use((req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

export default app;
