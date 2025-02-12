import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import cloudinaryConfig from "./utils/cloudinaryConfig.js";
import bodyParser from "body-parser";
import { urlencoded } from "express";
import { createServer } from "http";
import { initSocket } from "./socket.js";
import cors from "cors";

dotenv.config() 
const app = express();

const httpServer = createServer(app);
initSocket(httpServer);

app.get("/", (req, res) => {
  res.send("Api is running");
});

// Connect to MongoDB
connectDB()

// Cloudinary config
cloudinaryConfig()

// Middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())
// import routes
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);

// Error middleware import
import errorHandler from "./middlewares/error.middleware.js";

// Error middleware
app.use(errorHandler)

httpServer.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on port ${process.env.PORT || 8000}`);
});