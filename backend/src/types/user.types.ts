import { Request } from "express";

export type UserDetails = {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  authProvider: "local" | "google";
};

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}
