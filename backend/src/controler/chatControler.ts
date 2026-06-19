import { Request, Response } from "express";
import Message from "../model/message";
import { AuthRequest } from "../types/user.types";
export const getMessage = async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const message = await Message.find({
    conversationId: chatId,
  });

  res.status(200).json({ success: true, message });
};

export const GetRecentChats = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const currentUserId = req.user.id;
    const message = await Message.find({
      $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
    })
      .sort({ createdAt: -1 })
      .populate("senderId receiverId", "fullName profilepic");

    const recentChats = [];
    const seenUsers = new Set();

    for (let msg of message) {
      const otherUser =
        msg.senderId._id.toString() === currentUserId
          ? msg.receiverId
          : msg.senderId;

      if (!seenUsers.has(otherUser._id.toString())) {
        seenUsers.add(otherUser._id.toString());

        recentChats.push({
          user: otherUser,
          lastMessage: msg.text,
          time: msg.createdAt,
        });
      }
    }
    res.status(200).json(recentChats);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
