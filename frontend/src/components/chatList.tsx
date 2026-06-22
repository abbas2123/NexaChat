import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getConversations } from "../services/conversationService";
import ChatCard from "./buttens/chatCard";
import { useNavigate, useParams } from "react-router-dom";

type Conversation = {
  conversationId: string;

  user: {
    _id: string;
    name: string;
    profilePic: string;
  };

  lastMessage: string;

  time: string;
};

function ChatList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const navigate = useNavigate();

  const { conversationId } = useParams();
  console.log("Current URL conversationId:", conversationId);

  console.log("State conversations:", conversations);
  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getConversations();
        console.log("Full response:", data);

        console.log("Conversations array:", data.conversations);
        setConversations(data.conversations || []);
      } catch (error) {
        console.error(error);
      }
    };
    loadChats();
  }, []);
  return (
    <div className="w-80 border-r border-[#333B33] flex flex-col bg-[#0D150E] text-white">
      <div className="p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9389]"
          />

          <input
            type="search"
            placeholder="Search chats..."
            className="
    w-full
    py-3
    pl-10
    pr-4
    rounded-xl
    bg-[#081009]
    border border-[#333B33]
    text-white
    outline-none
    focus:border-[#25D366]/50
    transition-all
  "
          />
        </div>

        <h4 className="text-sm text-gray-400 mt-3 font-bold">
          Recent Conversations
        </h4>
      </div>
      {conversations.map((conversation) => (
        <ChatCard
          key={conversation.conversationId}
          conversation={conversation}
          selected={conversationId === conversation.conversationId}
          onClick={() => navigate(`/chat/${conversation.conversationId}`)}
        />
      ))}
    </div>
  );
}

export default ChatList;
