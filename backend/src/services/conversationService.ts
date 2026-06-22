import { ConversationRepository } from "../repositories/conversation.repo";

export class ConversationService {
  constructor(private conversationRepo: ConversationRepository) {}

  async getOrCreateConversation(currentUserId: string, otherUserId: string) {
    let conversation = await this.conversationRepo.findConversation(
      currentUserId,
      otherUserId,
    );

    if (!conversation) {
      conversation = await this.conversationRepo.createConversation([
        currentUserId,
        otherUserId,
      ]);
    }

    return conversation;
  }

  async getConversations(userId: string) {

    console.log("SERVICE CALLED");
    const conversations = await this.conversationRepo.getConversations(userId);

    return conversations.map((conversation: any) => {
      const otherUser = conversation.participants.find(
        (user: any) => user._id.toString() !== userId,
      );

      return {
        conversationId: conversation._id,

        user: {
          _id: otherUser._id,
          name: otherUser.name,
          profilePic: otherUser.profilePic,
        },

        lastMessage: conversation.lastMessage?.text || "",

        time: conversation.lastMessage?.createdAt || conversation.updatedAt,
      };
    });
  }
}
