import { ContactRepository } from "../repositories/contact.repo";
import { UserRepository } from "../repositories/user.repositry";

export class ContactService {
  constructor(
    private contactRepo: ContactRepository,
    private userRepo: UserRepository,
  ) {}

  async saveContact(ownerId: string, nexaId: number) {
    const user = await this.userRepo.findByNexaId(nexaId);

    if (!user) {
      throw new Error("User is not using Nexa Chat");
    }

    if (user._id.toString() === ownerId) {
      throw new Error("you cannot save yourself");
    }

    const existing = await this.contactRepo.findContact(
      ownerId,
      user._id.toString(),
    );
    if (existing) {
      throw new Error("Contact already exists");
    }

    return await this.contactRepo.createContact(ownerId, user._id.toString());
  }
  async getContacts(ownerId: string) {
    return await this.contactRepo.getContacts(ownerId);
  }

  async deleteContacts(id:string){
  return await this.contactRepo.deleteContact(id);
  }
}
