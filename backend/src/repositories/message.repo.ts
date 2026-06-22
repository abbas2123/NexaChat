import Message from "../model/message";

export class MessageRepository {
  async createMessage(conversationId: string, senderId: string, text: string) {
    return await Message.create({
      conversationId,
      senderId,
      text,
      delivered: false,
      isSeen: false,
    });
  }

  async getMessages(conversationId: string) {
    return await Message.find({
      conversationId,
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "name profilePic");
  }

  async markDelivered(conversationId: string, currentUserId: string) {
    return await Message.updateMany(
      {
        conversationId,

        senderId: { $ne: currentUserId },

        delivered: false,
      },

      {
        delivered: true,
      },
    );
  }

  async markSeen(conversationId: string, currentUserId: string) {
    return await Message.updateMany(
      {
        conversationId,

        senderId: { $ne: currentUserId },

        isSeen: false,
      },

      {
        isSeen: true,
      },
    );
  }
}
