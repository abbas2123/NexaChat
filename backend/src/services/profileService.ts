import { UserRepository } from "../repositories/user.repositry";

export class ProfileService {
  constructor(private userRepo: UserRepository) {}

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async updateProfile(
    userId: string,
    data: {
      name?: string;
      bio?: string;
      github?: string;
      linkedin?: string;
      profilePic?: string;
    },
  ) {
    const user = await this.userRepo.updateProfile(userId,data)
    if(!user){
      throw new Error ("User Not Found");
    }
    return user;
  }
}
