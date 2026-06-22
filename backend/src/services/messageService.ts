import { MessageRepository } from "../repositories/message.repo";
import { ConversationRepository } from "../repositories/conversation.repo";
import { getIO } from "../socket/socket";
export class MessageService {
  constructor(
    private messageRepo: MessageRepository,
    private conversationRepo: ConversationRepository,
  ) {}

  async sendMessage(conversationId: string, senderId: string, text: string) {
    const message = await this.messageRepo.createMessage(
      conversationId,
      senderId,
      text,
    );
    await this.conversationRepo.updateLastMessage(
      conversationId,
      text,
      senderId,
    );
    const conversation = await this.conversationRepo.findById(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }
    console.log("emitting to room:", conversationId);
    getIO().to(conversationId).emit("receive_message", message);
    return message;
  }

  async getMessages(conversationId: string, currentUserId: string) {
    // await this.messageRepo.markSeen(conversationId, currentUserId);

    const messages = await this.messageRepo.getMessages(conversationId);

    const conversation = await this.conversationRepo.findById(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const participants = conversation.participants as any[];

    const otherUser = participants.find(
      (user) => user._id.toString() !== currentUserId,
    );

    return {
      messages,
      user: otherUser,
    };
  }
  async markDelivered(conversationId: string, currentUserId: string) {
    await this.messageRepo.markDelivered(conversationId, currentUserId);
  }
}
