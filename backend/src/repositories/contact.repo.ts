import Contact from "../model/contact";

export class ContactRepository {
  async findContact(ownerId: string, contactId: string) {
    return await Contact.findOne({
      ownerId,
      contactId,
    });
  }

  async createContact(ownerId: string, contactId: string) {
    const contact = await Contact.create({
      ownerId,
      contactId,
    });
    return await contact.populate(
      "contactId",

      "name profilePic nexaId",
    );
  }

  async getContacts(ownerId: string) {
    return await Contact.find({ ownerId }).populate(
      "contactId",
      "name profilePic nexaId",
    );
  }

  async deleteContact(id:string){
    return await Contact.findByIdAndDelete(id);
  }
}
