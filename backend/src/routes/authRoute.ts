
import { Router } from "express";
import { RegisterUser, LoginUser } from "../controler/authController";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

console.log("Auth Router Loaded");

router.post("/register",RegisterUser,);

router.post("/login", LoginUser);

export default router;
