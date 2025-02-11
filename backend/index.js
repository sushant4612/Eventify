import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config() 

const app = express();


app.get("/", (req, res) => {
  res.send("Api is running");
});

// Connect to MongoDB
connectDB()

// Middleware
app.use(express.json());

// import routes
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/error.middleware.js";

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("api/v1/events", eventRoutes);

// Error middleware
app.use(errorHandler)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});