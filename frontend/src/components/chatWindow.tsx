import { useState, useEffect, useRef } from "react";
import { Phone, Video, Send, Check, CheckCheck } from "lucide-react";
import { getMessages, sendMessage } from "../services/messageService";
import { useSocket } from "../context/socketProvider";
type ChatWindowProps = {
  conversationId?: string;
};
type User = {
  _id: string;

  name: string;

  profilePic: string;
};
type Message = {
  _id: string;
  conversationId: string;
  text: string;

  senderId:
    | string
    | {
        _id: string;
        name: string;
        profilePic: string;
      };

  createdAt: string;

  delivered: boolean;

  isSeen: boolean;
};
function ChatWindow({ conversationId }: ChatWindowProps) {
  const socket = useSocket();
  const [user, setUser] = useState<User | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState("");
  const currentUserId = localStorage.getItem("userId");
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;

    const loadMessage = async () => {
      try {
        const data = await getMessages(conversationId);
        console.log("getMessages response:", data);
        console.log("User:", data.user);
        setMessages(data.messages || []);
        setUser(data.user);
      } catch (error) {
        console.error(error);
      }
    };
    loadMessage();
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) return;
    console.log("joining room", conversationId);
    socket.emit("join_conversation", conversationId);

    return () => {
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId, socket]);

 useEffect(() => {
  const handleDelivered = ({
    conversationId: deliveredConversationId,
  }: {
    conversationId: string;
  }) => {
    setMessages((prev) =>
      prev.map((msg) => {
        const senderId =
          typeof msg.senderId === "string" ? msg.senderId : msg.senderId._id;

        if (
          msg.conversationId === deliveredConversationId &&
          senderId === currentUserId
        ) {
          return {
            ...msg,
            delivered: true,
          };
        }

        return msg;
      }),
    );
  };

   socket.on("messages_delivered", handleDelivered);

   return () => {
     socket.off("messages_delivered", handleDelivered);
   };
 }, [socket, currentUserId]);

  const handleSend = async () => {
    if (!inputMessage.trim() || !conversationId) return;

    try {
      const response = await sendMessage(conversationId, inputMessage);

      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === response.message._id);

        if (exists) return prev;

        return [...prev, response.message];
      });

      setInputMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };
  useEffect(() => {
  const handleReceiveMessage = (message: Message) => {
    console.log("received", message);

    if (message.conversationId !== conversationId) return;

    setMessages((prev) => {
      const exists = prev.some((msg) => msg._id === message._id);

      if (exists) return prev;

      return [...prev, message];
    });

    socket.emit("messages_delivered", {
      conversationId: message.conversationId,
      currentUserId,
    });
  };
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, conversationId,currentUserId]);

  useEffect(() => {
    if (!conversationId) return;

    socket.emit("messages_delivered", {
      conversationId,
      currentUserId,
    });
  }, [conversationId, currentUserId, socket]);
  if (!conversationId) {
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
      <div className="h-20 border-b border-[#333B33] flex items-center justify-between px-6">
        <div className="flex items-center">
          <img
            src={
              user?.profilePic
                ? `http://localhost:3000${user.profilePic}`
                : `https://ui-avatars.com/api/?name=${user?.name || "User"}`
            }
            alt={user?.name}
            className="w-12 h-12 rounded-full"
          />

          <div className="ml-3">
            <h2 className="font-bold text-lg">{user?.name}</h2>

            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="p-3 rounded-full bg-[#151E16] hover:bg-[#25D366] transition"
            onClick={() => console.log("Audio call")}
          >
            <Phone size={20} />
          </button>

          <button
            className="p-3 rounded-full bg-[#151E16] hover:bg-[#25D366] transition"
            onClick={() => console.log("Video call")}
          >
            <Video size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-2 bg-[#0B141A]">
        {messages.map((msg) => {
          const senderId =
            typeof msg.senderId === "string" ? msg.senderId : msg.senderId._id;

          const isMe = senderId === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 shadow-md ${
                  isMe
                    ? "bg-[#005C4B] rounded-2xl rounded-br-md"
                    : "bg-[#202C33] rounded-2xl rounded-bl-md"
                }`}
              >
                <p className="text-white break-words whitespace-pre-wrap">
                  {msg.text}
                </p>

                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[11px] text-gray-300">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>

                  {isMe &&
                    (msg.isSeen ? (
                      <CheckCheck size={14} className="text-sky-400" />
                    ) : msg.delivered ? (
                      <CheckCheck size={14} className="text-gray-300" />
                    ) : (
                      <Check size={14} className="text-gray-300" />
                    ))}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef}></div>
      </div>
      {/* Input Area */}

      <div className="border-t border-[#333B33] p-4 flex gap-3">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-[#081009] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none"
        />

        <button
          onClick={handleSend}
          className="

    bg-[#25D366]

    hover:bg-[#20bd5c]

    w-12

    h-12

    rounded-full

    flex

    items-center

    justify-center

    transition

  "
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
