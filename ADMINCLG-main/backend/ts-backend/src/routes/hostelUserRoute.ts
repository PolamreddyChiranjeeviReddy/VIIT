import express from "express";
import { registerUser, loginUser, sendOtp, verifyOtp, resetPassword } from "../controllers/hostelUserController";

const hostelUserRouter = express.Router();

hostelUserRouter.post("/register", registerUser);
hostelUserRouter.post("/login", loginUser);
hostelUserRouter.post("/send-otp", sendOtp);
hostelUserRouter.post("/verify-otp", verifyOtp);
hostelUserRouter.post("/reset-password", resetPassword);

export default hostelUserRouter;