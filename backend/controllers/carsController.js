import carsModel from "../models/carsModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointementModel from "../models/appointmentModel.js";

// API to change available status 
export const changeStatus = async (req, res) => {
    const { carId } = req.body;
    
    try {
        const carData = await carsModel.findById(carId);
        await carsModel.findByIdAndUpdate(carId, { available: !carData.available });
        res.json({ success: true, message: "Availability Changed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const carList = async (req, res) => {
    try {
        const allCars = await carsModel.find({}).select(["-password", "-email"]);
        res.json({ success: true, allCars });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for car login
export const carLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const car = await carsModel.findOne({ email });
        if (!car) {
            return res.json({ success: false, message: "Car Not Found" });
        }

        const isMatch = await bcrypt.compare(password, car.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: car._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get car appointments for car panel
export const appointmentList = async (req, res) => {
    const carId = req.carId;
    
    try {
        const appointments = await appointementModel.find({ carId }).populate("userData");
        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};