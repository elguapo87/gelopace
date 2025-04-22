import express from "express";
import { appointmentList, cancelAppointment, carList, carLogin, completeAppontment } from "../controllers/carsController.js";
import carAuth from "../middlewares/carAuth.js";

const carRouter = express.Router();

carRouter.get("/car-list", carList);
carRouter.post("/login", carLogin);
carRouter.get("/appointment-list", carAuth, appointmentList);
carRouter.post("/complete-appointment", carAuth, completeAppontment);
carRouter.post("/cancel-appointment", carAuth, cancelAppointment);

export default carRouter;