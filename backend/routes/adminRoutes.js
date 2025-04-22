import express from "express";
import upload from "../middlewares/multer.js";
import { addCar, adminLogin, appointmentList, carList } from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";
import { changeStatus } from "../controllers/carsController.js";

const adminRouter = express.Router();

adminRouter.post("/add-car", adminAuth, upload.single("image"), addCar);
adminRouter.post("/login", adminLogin);
adminRouter.post("/car-list", adminAuth, carList);
adminRouter.post("/change-status", adminAuth, changeStatus);
adminRouter.get("/appointment-list", adminAuth, appointmentList);

export default adminRouter;