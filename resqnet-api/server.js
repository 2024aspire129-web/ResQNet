import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import connectDB from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import shelterRoutes from "./routes/shelterRoute.js";
import volunteerRoutes from "./routes/volunteerRoute.js";
import planRoutes from "./routes/planRoute.js";
import incidentRoutes from "./routes/incidentRoute.js";
import alertRoutes from "./routes/alertRoute.js";
import postRoutes from "./routes/postRoute.js";
import stripeRoutes from "./routes/stripeRoute.js";
import supplyRoutes from "./routes/donationRoute.js";
import hospitalRoutes from "./routes/hospitalRoute.js";
import responerRoutes from "./routes/responderRoute.js";
import emergencyRoute from "./routes/emergencyRoute.js";

const normalizeOrigin = (origin) => origin?.trim().replace(/\/$/, "");
const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean)
  .flatMap((origin) => (origin.startsWith("http") ? [origin] : [`https://${origin}`, `http://${origin}`]));

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...envOrigins,
];

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(normalizeOrigin(origin))) {
    return callback(null, true);
  }

  return callback(new Error("Not allowed by CORS"));
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);


// app.use(express.json({ urlencoded: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (_req, res) => {
  const isDatabaseConnected = mongoose.connection.readyState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    api: "running",
    database: isDatabaseConnected ? "connected" : "disconnected",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shelter", shelterRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/incident", incidentRoutes);
app.use("/api/emergency", emergencyRoute);


app.use("/api/alerts", alertRoutes);
app.use("/api/threads", postRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/donations", supplyRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/responder", responerRoutes);
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use((err, _req, res, _next) => {
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server Error" });
});


const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`API is running on port ${PORT}`));
  })
  .catch(() => {
    process.exit(1);
  });
