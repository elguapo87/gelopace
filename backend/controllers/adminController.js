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

