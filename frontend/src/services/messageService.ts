import api from "../api/axios";

export const getMessages = async (conversationId: string) => {
  const response = await api.get(`/message/${conversationId}`);

  return response.data;
};

export const sendMessage = async (conversationId: string, text: string) => {
  const response = await api.post("/message", {
    conversationId,
    text,
  });

  return response.data;
};