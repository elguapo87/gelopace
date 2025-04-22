import express from "express";
import { appointmentList, bookAppointment, cancelAppointment, profileUpdate, registerUser, userLogin, userProfile } from "../controllers/usersController.js";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLogin);
userRouter.get("/user-profile", userAuth, userProfile);
userRouter.post("/profile-update", upload.single("image"), userAuth, profileUpdate);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointment-list", userAuth, appointmentList);
userRouter.post("/cancel-appointment", userAuth, cancelAppointment);

export default userRouter;