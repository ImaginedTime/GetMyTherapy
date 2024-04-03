import { Router } from "express";

// controller functions
import { forgotPassword, loginUser, resetPassword, signupUser, verifyOtp } from "../controllers/user.js";

const router = Router();

// login route
router.post("/login", loginUser);

// sign up route
router.post("/signup", signupUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtp);

router.post("/reset-password", resetPassword)

export default router;
