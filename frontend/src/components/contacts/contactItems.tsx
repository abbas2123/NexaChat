import { MoreVertical, MessageCircle, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateConversation } from "../../services/conversationService";
interface ContactProps {
  id: string;
  userId: string;
  name: string;
  nexaId: string;
  onDelete: (id: string) => void;
}

const ContactItem = ({ id, userId, name, nexaId, onDelete }: ContactProps) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChat = async () => {
    console.log("Clicked");
    const data = await getOrCreateConversation(userId);
console.log(data);
    navigate(`/chat/${data.conversation._id}`);
  };
  return (
    <div className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-[#151E16] transition-all cursor-pointer">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-2xl bg-[#081009] border border-[#333B33] flex items-center justify-center text-xl font-bold text-[#333B33]">
        {name[0]}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#E1E3DF]">{name}</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#333B33]/50 text-[#C1C9BE]">
            #{nexaId}
          </span>
        </div>
      </div>

      {/* Hover Actions */}
      <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
        <button
          className="p-2 text-[#8B9389] hover:text-[#25D366]"
          onClick={handleChat}
        >
          <MessageCircle size={18} />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            className="p-2 text-[#8B9389] hover:text-[#E1E3DF]"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical size={18} />
          </button>

          {showMenu && (
            <div
              className="absolute right-0 top-full mt-2 w-44 rounded-xl
                    border border-[#333B33]
                    bg-[#151E16]
                    shadow-xl z-50"
            >
              <button
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-[#253126]"
                onClick={() => onDelete(id)}
              >
                <Trash2 size={16} />
                Delete Contact
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
