import api from "../api/axios";

export const getMessage = async (chatId:number) =>{
  const response = await api.get(`/message/${chatId}`);

  return response.data;
}

export const GetRecentChats = async ()=>{
  const response = await api.get("/message/recent-chats");

  return response.data;
}
