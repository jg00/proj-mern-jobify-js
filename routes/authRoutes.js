import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

// Default status code is 429 Too Many Requests
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  // message: "Too many request from this IP address, please try again after 15 minutes",
  handler: (request, response, next, options) => {
    throw new Error(
      "Too many request from this IP address, please try again after 15 minutes"
    );
  },
});

import { register, login, updateUser } from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

// /api/v1/auth
router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
