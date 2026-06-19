

import ChatList from "../components/chatList";
import ChatWindow from "../components/chatWindow";
import { useState } from "react";
type userType = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
};
const Dashboard = () => {
  const [selectedId, setSelectedId] = useState<userType | null>(null);
console.log("Dashboard state:", selectedId);
  return (
    <div className="flex flex-1">
      <ChatList selectedId={selectedId} setSelectedId={setSelectedId} />
      <ChatWindow selectedChat={selectedId} />
    </div>
  );
};

export default Dashboard;
