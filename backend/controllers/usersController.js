import validator from "validator";
import bcrypt from "bcrypt";
import usersModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

// API to register user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a Strong Password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new usersModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for user login
export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Not Found" }); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user profile data
// export const userProfile = async (req, res) => {
//     const { userId } = req.body;
    
//     try {
//         const userData = await usersModel.findById(userId).select("-password");
//         res.json({ success: true, userData });
        
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

export const userProfile = async (req, res) => {
    const userId = req.userId;

    try {
        const userData = await usersModel.findById(userId).select("-password");
        res.json({ success: true, userData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update user profile data
export const profileUpdate = async (req, res) => {
    const userId = req.userId;

    const { name, email, phone, address, gender, dob } = req.body;
    const imageFile = req.file;
    
    try {
        if (!name || !phone || !email || !address || !gender || !dob) {
            return res.json({ success: false, message: "Missing Details" });
        }

        await usersModel.findByIdAndUpdate(userId, {
            name,
            phone,
            email,
            address: JSON.parse(address),
            gender,
            dob
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;

            await usersModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile Updated" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// API to book appointment 
export const bookAppointment = async (req, res) => {
    const userId = req.userId;

    const { carId, slotDate, slotTime } = req.body;

    try {
        const carData = await carsModel.findById(carId).select("-password");
        if (!carData.available) {
            return res.json({ success: false, message: "Car is not available" });
        }

        let slots_booked = carData.slots_booked;

        // Checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is not available" });

            } else {
                slots_booked[slotDate].push(slotTime);
            }

        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await usersModel.findById(userId).select("-password");

        delete carData.slots_booked;

        const appointmentData = {
            userId,
            carId,
            userData,
            carData,
            slotDate,
            slotTime,
            amount: carData.fees,
            date: Date.now()
        };

        const newAppointment = new appointementModel(appointmentData);
        await newAppointment.save();

        // Save new slots data in carData
        await carsModel.findByIdAndUpdate(carId, { slots_booked });

        res.json({ success: true, message: "Appointment Booked" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

