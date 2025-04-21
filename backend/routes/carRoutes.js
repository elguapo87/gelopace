import express from "express";
import { carList } from "../controllers/carsController.js";

const carRouter = express.Router();

carRouter.get("/car-list", carList);

export default carRouter;