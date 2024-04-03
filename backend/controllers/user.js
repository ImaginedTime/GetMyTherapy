import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { sendingMail } from "../utils/mailer.js";
import bcrypt from "bcryptjs";


const createToken = (body, time='3d') => {
    return jwt.sign(body, process.env.JWT_SECRET_KEY, {
        expiresIn: time,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("logging in");
        const user = await User.login(email, password);

        // create a token
        const token = createToken({ _id: user._id });

        res.status(200).json({ message: "Login Successful", email, username: user.username, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// signup user
export const signupUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const user = await User.signup(email, username, password);

        // create a token
        const token = createToken({ _id: user._id });

        res.status(200).json({ message: "Signup Successful", email, username, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// forgot password -> sends otp to email
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if(!email) return res.status(400).json({ error: "Email is required" });

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // generate otp
        const otp = Math.floor(1000 + Math.random() * 9000);

        sendingMail({
            from: process.env.email,
            to: email,
            subject: "Password reset OTP",
            text: `Your OTP is ${otp}`,
        });

        // encrypt the otp
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otp.toString(), salt);

        const token = createToken({ _id: user._id, otp: hashedOtp }, '10m');

        res.status(200).json({ email, token });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if(!email || !otp) return res.status(400).json({ error: "Email and OTP are required" });

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = verifyToken(token);

        if (decoded.otp) {
            const isValid = await bcrypt.compare(otp.toString(), decoded.otp.toString());

            if (!isValid) {
                throw new Error("Invalid OTP");
            }

            const token = createToken({ _id: user._id }, '10m');

            res.status(200).json({ message: "OTP verified", token });
        } else {
            throw new Error("Invalid token");
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const resetPassword = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).json({ error: "Email and password are required" });

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ message: "Password reset successful" });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}