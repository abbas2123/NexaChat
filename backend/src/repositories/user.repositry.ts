import User from "../model/user";

export class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }
  async createUser(userData: {
    name: string;

    email: string;

    password: string;
    nexaId: number;
  }) {
    return User.create(userData);
  }

  async findByNexaId(nexaId: number) {
    return User.findOne({ nexaId });
  }
  async findById(id: string) {
    return User.findById(id).select("-password");
  }

  async updateProfile(
    userId: string,
    updateData: {
      name?: string;
      bio?: string;
      github?: string;
      linkedin?: string;
      profilePic?: string;
    },
  ) {
    return User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });
  }
}
