import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { ConversationRepository } from "../repositories/conversation.repo";
import { ConversationService } from "../services/conversationService";
import message from "../model/message";

const conversationRepo = new ConversationRepository();
const conversationService = new ConversationService(conversationRepo);

export const getOrCreateConversation = async (
  req: AuthRequest,
  res: Response,
) => {
  console.log("GET OR CREATE CALLED");
  try {
    const currentUserId = req.userId;
    const { userId } = req.params;

    if (!currentUserId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    if (Array.isArray(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user id",
      });
    }

    const conversation = await conversationService.getOrCreateConversation(
      currentUserId,
      userId,
    );

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversations = async (req: AuthRequest, res: Response) => {
  console.log("sdfdsvsdvsdvsdvsvsdsv");
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const conversations = await conversationService.getConversations(
      req.userId,
    );
    console.log("Controller response:");

    console.log(conversations);
    res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
