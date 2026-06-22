import api from "../api/axios";

export const getOrCreateConversation = async (userId: string) => {
  const response = await api.get(`/conversation/${userId}`);

  return response.data;
};

export const getConversations = async () => {
  console.log("Calling GET /api/conversation");
  const response = await api.get("/conversation");
console.log('response',response);
  return response.data;
};
