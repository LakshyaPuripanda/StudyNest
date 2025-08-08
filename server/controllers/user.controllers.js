import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary } from "../utils/cloudinary.js";

// registeration ke liye business logic
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."

            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            message: "Account created successfully."
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }
}

// login ke liye business logic 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."

            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });
        }
        // generateToken function is in utils folder
        generateToken(res, user, `Welcome back ${user.name}`) // tilde(`) - used for template literal , string is not used
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to Login"
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully.",
            success: true

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

export const getUserProfile = async (req, res) => {
    console.log("hii");
    try {
        const userId = req.id;
        // console.log("hii");
        const user = await User.findById(userId).select("-password");
        // console.log("hii");
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false
            });
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Failed to load user"
        })
    }
}
// profile bussiness logic
export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file ? req.file.path : null;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        let photoDeleted = false;
        let photoUrl = user.photoUrl; // default to old photo

        // If a new photo is uploaded
        if (profilePhoto) {
            // Delete old photo from Cloudinary if exists
            if (user.photoUrl) {
                const publicId = user.photoUrl.split("/").pop().split(".")[0];
                const result = await deleteMediaFromCloudinary(publicId);
                if (result.result === "ok") {
                    photoDeleted = true;
                }
            }
            // Upload new photo
            const { uploadMedia } = await import("../utils/cloudinary.js"); // Import here if not already imported
            const cloudResponse = await uploadMedia(profilePhoto);
            photoUrl = cloudResponse.secure_url;
        }

        // Update user data
        user.name = name || user.name;
        user.photoUrl = photoUrl;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
            photoDeleted
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        });
    }
};