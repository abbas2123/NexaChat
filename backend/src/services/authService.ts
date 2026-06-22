import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { LoginDto } from "../dtos/auth.dtos";
import { UserRepository } from "../repositories/user.repositry";

export class AuthService {
  constructor(private userRepo: UserRepository) {}
  private async generateUniqueNexaId(): Promise<number> {
    let nexaId = 0;
    let exists = true;

    while (exists) {
      nexaId = Math.floor(1000000000 + Math.random() * 9000000000);

      const user = await this.userRepo.findByNexaId(nexaId);

      exists = !!user;
    }

    return nexaId;
  }
  async login(data: LoginDto) {
    const { email, password } = data;

    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new Error("User not Found");
    }
    if (!user.nexaId) {
      const nexaId = await this.generateUniqueNexaId();
      user.nexaId = nexaId;
      await user.save();
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("invalid password");
    }
    const token = Jwt.sign(
      {
        userId: user._id,
      },

      process.env.JWT_SECRET as string,

      {
        expiresIn: "7d",
      },
    );
    return {
      success: true,

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
        nexaId: user.nexaId,
      },
    };
  }

  async register(
    name: string,

    email: string,

    password: string,
  ) {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nexaId = await this.generateUniqueNexaId();
    const user = await this.userRepo.createUser({
      name,

      email,

      password: hashedPassword,
      nexaId,
    });

    const token = Jwt.sign(
      { userId: user._id },

      process.env.JWT_SECRET as string,

      { expiresIn: "7d" },
    );

    return {
      success: true,

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
        nexaId: user.nexaId,
      },
    };
  }
  async getCurrentUser(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      user,
    };
  }
}
