import Conversation from "../model/Conversation";

export class ConversationRepository {
  async findConversation(user1: string, user2: string) {
    return await Conversation.findOne({
      participants: {
        $all: [user1, user2],
      },
    });
  }

  async createConversation(participants: string[]) {
    return await Conversation.create({
      participants,
    });
  }

  async getConversations(userId: string) {
    return await Conversation.find({
      participants: userId,
    })
      .sort({ updatedAt: -1 })
      .populate("participants", "name profilePic");
  }
  async updateLastMessage(
    conversationId: string,
    text: string,
    senderId: string,
  ) {
    return await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: {
          text,
          senderId,
          createdAt: new Date(),
        },
      },
      { new: true },
    );
  }
  async findById(conversationId: string) {
    return await Conversation.findById(conversationId)

      .populate("participants", "name profilePic");
  }
}
