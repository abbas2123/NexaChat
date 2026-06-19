import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { ContactRepository } from "../repositories/contact.repo";
import { UserRepository } from "../repositories/user.repositry";
import { ContactService } from "../services/contactService";

const contactrepo = new ContactRepository();
const userRepo = new UserRepository();

const contactService = new ContactService(contactrepo, userRepo);

export const saveContact = async (req: AuthRequest, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("USER ID:", req.userId);
    const ownerId = req.userId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const { nexaId } = req.body;

    const contact = await contactService.saveContact(ownerId, Number(nexaId));

    return res.status(201).json({
      success: true,
      contact,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = req.userId;

    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const contacts = await contactService.getContacts(ownerId);

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    console.log('fddssdsd')
    const { id } = req.params;
    if (Array.isArray(id)) {
      return res.status(400).json({
        success: false,

        message: "Invalid contact id",
      });
    }
    await contactService.deleteContacts(id);

    res.status(200).json({
      success: true,

      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Something went wrong",
    });
  }
};
