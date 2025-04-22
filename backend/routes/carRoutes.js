import express from "express";
import { appointmentList, carList, carLogin } from "../controllers/carsController.js";
import carAuth from "../middlewares/carAuth.js";

const carRouter = express.Router();

carRouter.get("/car-list", carList);
carRouter.post("/login", carLogin);
carRouter.get("/appointment-list", carAuth, appointmentList);

export default carRouter;