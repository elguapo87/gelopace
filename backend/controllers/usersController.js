import validator from "validator";
import bcrypt from "bcrypt";
import usersModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";

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