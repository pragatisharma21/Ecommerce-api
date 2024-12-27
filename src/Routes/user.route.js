import express from "express";
import {
  login,
  signup,
  getUser,
  getUserByName,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get('/getuserbyname', authMiddleware, getUserByName);

router.get("/getUser", authMiddleware, getUser);

export default router;