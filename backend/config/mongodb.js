import mongoose from "mongoose";

const DBConnect = async () => {
    mongoose.connection.on("connected", () => {
        console.log("Database Connected");
    })
    await mongoose.connect(`${process.env.MONGO_DB_URI}/prescripto`);
};

export default DBConnect;