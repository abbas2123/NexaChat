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

type ChatCardProps = {
  conversation: Conversation;

  selected: boolean;

  onClick: () => void;
};

function ChatCard({ conversation, selected, onClick }: ChatCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 p-4
        rounded-2xl mb-1 transition-all duration-300
        ${
          selected
            ? "bg-[#151E16] border border-[#333B33] border-r-4 border-r-[#25D366]"
            : "hover:bg-[#333B33]/20"
        }
      `}
    >
      <img
        src={
          conversation.user?.profilePic
            ? `http://localhost:3000${conversation.user.profilePic}`
            : `https://ui-avatars.com/api/?name=${conversation.user?.name || "User"}`
        }
        className="w-12 h-12 rounded-xl border border-[#333B33]"
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between">
          <h3 className="font-semibold text-white">
            {conversation.user?.name || "Unknown User"}
          </h3>

          <span className="text-[10px] text-[#8B9389]">
            {new Date(conversation.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="text-xs text-[#8B9389] truncate">
          {conversation.lastMessage || "No messages yet"}
        </p>
      </div>
    </button>
  );
}

export default ChatCard;
