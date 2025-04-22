import express from "express";
import { appointmentList, cancelAppointment, carDashData, carList, carLogin, carProfile, completeAppontment, updateCarInfo } from "../controllers/carsController.js";
import carAuth from "../middlewares/carAuth.js";
import upload from "../middlewares/multer.js";

const carRouter = express.Router();

carRouter.get("/car-list", carList);
carRouter.post("/login", carLogin);
carRouter.get("/appointment-list", carAuth, appointmentList);
carRouter.post("/complete-appointment", carAuth, completeAppontment);
carRouter.post("/cancel-appointment", carAuth, cancelAppointment);
carRouter.get("/dash-data", carAuth, carDashData);
carRouter.get("/car-profile", carAuth, carProfile);
carRouter.post("/carinfo-update", upload.single("image"), carAuth,  updateCarInfo);

export default carRouter;