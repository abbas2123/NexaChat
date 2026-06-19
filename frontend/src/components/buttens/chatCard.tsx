type User = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
};

type ChatCardProps = {
  user: User;
  selected: boolean;
  onClick: () => void;
};

function ChatCard({ user, selected, onClick }: ChatCardProps) {
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
        src={user.avatar}
        className="w-12 h-12 rounded-xl border border-[#333B33]"
      />

      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between">
          <h3 className="font-semibold text-white">{user.name}</h3>

          <span className="text-[10px] text-[#8B9389]">{user.time}</span>
        </div>

        <p className="text-xs text-[#8B9389] truncate">{user.lastMessage}</p>
      </div>
    </button>
  );
}

export default ChatCard;
