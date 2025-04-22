import carsModel from "../models/carsModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointementModel from "../models/appointmentModel.js";

// API for adding cars
export const addCar = async (req, res) => {
    const { name, email, password, brand, aspiration, displacement, power, about, fees } = req.body
    const imageFile = req.file;

    try {
        // checking for all data to add doctor
        if (!name || !email || !password || !brand || !aspiration || !displacement || !power || !about || !fees) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validating strong passwords
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hasnedPassword = await bcrypt.hash(password, salt);

        // Upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const carData = {
            name,
            email,
            image: imageUrl,
            password: hasnedPassword,
            brand,
            aspiration,
            displacement,
            power,
            about,
            fees,
            date: Date.now()
        };

        const newCar = new carsModel(carData);
        await newCar.save();

        res.json({ success: true, message: "Car Added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for admin login
export const adminLogin = (req, res) => {
    const { email, password } = req.body;
    
    try {
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });

        } else {
            res.json({ success: false, message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all cars for admin panel
export const carList = async (req, res) => {
    try {
        const cars = await carsModel.find({}).select("-password");
        res.json({ success: true, cars });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all appointments list
export const appointmentList = async (req, res) => {
    try {
        const appointments = await appointementModel.find({}).populate("userData");
        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
