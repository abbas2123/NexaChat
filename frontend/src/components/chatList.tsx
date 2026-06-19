import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { GetRecentChats } from "../services/chatService";
import ChatCard from "./buttens/chatCard";

type User = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
};
type ChatListProps = {
  selectedId: User | null;
  setSelectedId: React.Dispatch<React.SetStateAction<User | null>>;
};
function ChatList({ selectedId, setSelectedId }: ChatListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        console.log("Calling API...");

        const data = await GetRecentChats();

        console.log("Response:", data);
        console.log(data);
        console.log("Response:", data);
        console.log("Type:", typeof data);
        console.log("Is Array:", Array.isArray(data));
       setUsers(Array.isArray(data.message) ? data.message : []);
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
      {users.map((user) => (
        <ChatCard
          key={user.id}
          user={user}
          selected={selectedId?.id === user.id}
          onClick={() => setSelectedId(user)}
        />
      ))}
    </div>
  );
}

export default ChatList;
