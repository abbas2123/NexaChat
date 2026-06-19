import express from "express";
import { getProfile, updateProfile } from "../controler/profile";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../config/multer";
const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.patch(
  "/profile",
  authMiddleware,
  upload.single("profilePic"),
  updateProfile,
);

export default router;
