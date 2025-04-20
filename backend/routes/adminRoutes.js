import express from "express";
import upload from "../middlewares/multer.js";
import { addCar } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/add-car", upload.single("image"), addCar);

export default adminRouter;