
import { Router } from "express";
import { RegisterUser, LoginUser,getCurrentUser } from "../controler/authController";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

console.log("Auth Router Loaded");

router.post("/register",RegisterUser,);

router.post("/login", LoginUser);
router.get("/me", authMiddleware, getCurrentUser);
export default router;
