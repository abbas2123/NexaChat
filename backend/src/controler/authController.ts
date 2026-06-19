import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { UserRepository } from "../repositories/user.repositry";

const repo = new UserRepository();
const authService = new AuthService(repo);
export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(
      name,

      email,

      password,
    );

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

export const LoginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};
