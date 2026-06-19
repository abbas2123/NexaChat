export interface IUser {
  _id: string;
  name: string;
  avatar?: string;
  online?: boolean;
}

export interface IMessage {
  _id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface IConversation {
  _id: string;
  name: string;
  lastMessage: string;
  updatedAt: string;
}
