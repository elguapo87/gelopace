import "dotenv/config";
import express from "express";
import cors from "cors";
import DBConnect from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRoutes from "./routes/adminRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

DBConnect();
connectCloudinary();

// Middlewares
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173", // Frontend local dev
    "http://localhost:5174", // Admin local dev
    "https://gelopace-client.onrender.com", // Frontend on Render
    "https://gelopace-admin.onrender.com", // Admin on Render
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));
// app.use(cors());

// API endpoints
app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});