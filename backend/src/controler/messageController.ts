import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { MessageRepository } from "../repositories/message.repo";
import { ConversationRepository } from "../repositories/conversation.repo";
import { MessageService } from "../services/messageService";

const messageRepo = new MessageRepository();
const conversationRepo = new ConversationRepository();

const messageService = new MessageService(messageRepo, conversationRepo);

export const sendMessage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { conversationId, text } = req.body;

    const message = await messageService.sendMessage(
      conversationId,
      req.userId,
      text,
    );

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    console.log("message route loaded");
    const { conversationId } = req.params;
    if (Array.isArray(conversationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid conversationId",
      });
    }
    
    const result = await messageService.getMessages(
      conversationId,
      req.userId!,
    );

    res.status(200).json({
      success: true,

      messages: result.messages,

      user: result.user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
