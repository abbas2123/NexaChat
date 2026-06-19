import { Response } from "express";
import { ProfileService } from "../services/profileService";
import { UserRepository } from "../repositories/user.repositry";
import { AuthRequest } from "../middleware/auth.middleware";
const repo = new UserRepository();
const profileService = new ProfileService(repo);

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await profileService.getProfile(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
console.log('req.file',req.file);
    const updatedUser = await profileService.updateProfile(userId, {
      name: req.body.name,
      bio: req.body.bio,
      github: req.body.github,
      linkedin: req.body.linkedin,

      ...(req.file && {
        profilePic: `/uploads/${req.file.filename}`,
      }),
    });
    console.log('update',updatedUser);

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
