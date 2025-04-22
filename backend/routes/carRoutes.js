import express from "express";
import { carList, carLogin } from "../controllers/carsController.js";

const carRouter = express.Router();

carRouter.get("/car-list", carList);
carRouter.post("/login", carLogin);

export default carRouter;