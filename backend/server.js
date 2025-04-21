import "dotenv/config";
import express from "express";
import cors from "cors";
import DBConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoutes from "./routes/adminRoutes.js";
import carRoutes from "./routes/carRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

DBConnect();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
 res.send("API working")   ;
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});