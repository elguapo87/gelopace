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

// API to mark appointment completed for car panel
export const completeAppontment = async (req, res) => {
    const carId = req.carId;
    const { appointmentId } = req.body;
    
    try {
        const appointmentData = await appointementModel.findById(appointmentId);
        if (appointmentData && appointmentData.carId === carId) {
            await appointementModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
            res.json({ success: true, message: "Appointment Completed" });

        } else {
            return res.json({ success: false, message: "Mark Failed" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment for doctor panel
export const cancelAppointment = async (req, res) => {
    const carId = req.carId;
    const { appointmentId } = req.body;

    try {
        const appointmentData = await appointementModel.findById(appointmentId);
        if (appointmentData && appointmentData.carId !== carId) {
            return res.json({ success: false, message: "Cancellation  Failed" });
        }

        await appointementModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        
        const { slotDate, slotTime } = appointmentData;

        const carData = await carsModel.findById(carId);

        let slots_booked = carData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime);

        await carsModel.findByIdAndUpdate(carId, { slots_booked });

        res.json({ success: true, message: "Appointment Cancelled" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get dashboard data for car panel
export const carDashData = async (req, res) => {
    const carId = req.carId;

    try {
        const carAppointments = await appointementModel.find({ carId });

        let earnings = 0;

        carAppointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let customers = [];

        carAppointments.map((item) => {
            if (!customers.includes(item.userId)) {
                customers.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            customers: customers.length,
            carAppointments: carAppointments.length,
            latestAppointments: carAppointments.reverse().slice(0, 5)
        };

        res.json({ success: true, dashData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get car profile for car panel
export const carProfile = async (req, res) => {
    const carId = req.carId;
    
    try {
        const car = await carsModel.findById(carId).select("-password");
        res.json({ success: true, car });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to update car data from doctor panel
export const updateCarInfo = async (req, res) => {
    const carId = req.carId;
    const { name, email, brand, aspiration, displacement, power, about, fees, available } = req.body;
    const imageFile = req.file;

    try {
        await carsModel.findByIdAndUpdate(carId, {
            name,
            email,
            brand,
            aspiration,
            displacement,
            power,
            about,
            fees,
            available
        });

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;

            await carsModel.findByIdAndUpdate(carId, { image: imageUrl });
        }
        
        res.json({ success: true, message: "Car Info Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};