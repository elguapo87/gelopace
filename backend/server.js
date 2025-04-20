import "dotenv/config";
import express from "express";
import cors from "cors";
import DBConnect from "./config/mongodb.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

DBConnect;

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.get("/", (req, res) => {
 res.send("API working")   ;
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});