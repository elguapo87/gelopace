import express from "express";
import upload from "../middlewares/multer.js";
import { addCar, adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/add-car", adminAuth, upload.single("image"), addCar);
adminRouter.post("/login", adminLogin);


export default adminRouter;