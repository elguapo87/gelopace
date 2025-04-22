import jwt from "jsonwebtoken";

const carAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login again." });
        }

        const ctoken = authHeader.split(" ")[1];
        const token_decode = jwt.verify(ctoken, process.env.JWT_SECRET);
        req.carId = token_decode.id

        next();

    } catch (error) {
        console.log("Auth Error:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default carAuth;