import ChatList from "../components/chatList";
import ChatWindow from "../components/chatWindow";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { conversationId } = useParams();

  return (
    <div className="flex flex-1">
      <ChatList />

      <ChatWindow conversationId={conversationId} />
    </div>
  );
};

export default Dashboard;
