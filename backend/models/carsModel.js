import mongoose from "mongoose";

const carsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    aspiration: {
        type: String,
        required: true
    },
    displacement: {
        type: String,
        required: true
    },
    power: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    fees: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { minimize: false });

const carsModel = mongoose.models.car || mongoose.model("car", carsSchema);

export default carsModel;