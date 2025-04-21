import carsModel from "../models/carsModel.js";

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