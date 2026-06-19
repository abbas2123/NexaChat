import { useState,useEffect, useRef } from "react";
import { getMessage } from "../services/chatService";



type User = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
};
type ChatListProps = {
  selectedChat: User | null;
};

function ChatWindow({ selectedChat }: ChatListProps) {

const [message,setmessage] = useState([]);
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(()=>{
  messagesEndRef.current?.scrollIntoView({behavior:'smooth'});
},[message]);

useEffect(()=>{
  if(!selectedChat) return;

const loadMessage = async()=>{
  try {
    const data = await getMessage(selectedChat.id);
    
    setmessage(data.message);
  } catch (error) {
    console.error(error)
  }
  
}
loadMessage();
},[selectedChat])

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0D150E]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            No Conversation Selected
          </h2>
          <p className="text-gray-400 mt-2">Choose a chat to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#0D150E] text-white flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-[#333B33] flex items-center px-6">
        <img
          src={selectedChat.avatar}
          alt={selectedChat.name}
          className="w-12 h-12 rounded-full"
        />

        <div className="ml-3">
          <h2 className="font-bold text-lg">{selectedChat.name}</h2>

          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-6">
        {message.map((msg: any) => (
          <div key={msg.id} className="bg-[#151E16] p-3 rounded-xl mb-3" ref={messagesEndRef}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#333B33] p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full bg-[#081009] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none"
        />
      </div>
    </div>
  );
}

export default ChatWindow;
