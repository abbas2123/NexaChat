import {
  MessageSquare,
  Users,
  Phone,
  Settings,
  User,
  CircleDashed,
  Plus,
} from "lucide-react";
import { useState } from "react";
import SidebarButton from "./buttens/sidebarbutton";
import { useNavigate } from "react-router-dom";
function SideNavBar() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-[#081009] border-r border-[#333B33]  h-screen text-white flex flex-col p-6  gap-8">
      <div>
        <div
          className="flex items-center gap-5 mb-6 py-4"
          onClick={() => {
            navigate("/chat");
            setSelected("");
          }}
        >
          <img
            src="/image.png"
            alt="NexaChat"
            className="w-10 h-10 rounded-xl"
          />
          <div className="flex flex-col">
            <h1 className=" font-bold text-green-500 text-3xl">NexaChat</h1>
            <h4 className="text-sm text-gray-400">Active Now</h4>
          </div>
        </div>

        <nav className="flex flex-col gap-4">
          <SidebarButton
            icon={<MessageSquare size={22} />}
            label="Chats"
            value="chats"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              navigate("/chat");
            }}
          />
          <SidebarButton
            icon={<Users size={22} />}
            label="Contacts"
            value="contacts"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              navigate("/contact");
            }}
          />
          <SidebarButton
            icon={<Phone size={22} />}
            label="Calls"
            value="calls"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              navigate("/calls");
            }}
          />
          <SidebarButton
            icon={<CircleDashed size={22} />}
            label="Status"
            value="status"
            selected={selected}
            onSelect={(value) => {
              setSelected(value);
              navigate("/status");
            }}
          />
        </nav>
      </div>
      {/*Bottom */}
      <div className="mt-auto border-t border-gray-700 pt-4">
        <SidebarButton
          icon={<Plus size={22} />}
          label="New Chat"
          value="New Chat"
          selected={selected}
          onSelect={(value) => {
            setSelected(value);
            navigate("/new-chat");
          }}
        />
        <SidebarButton
          icon={<Settings size={22} />}
          label="Settings"
          value="settings"
          selected={selected}
          onSelect={(value) => {
            setSelected(value);
            navigate("/settings");
          }}
        />

        <SidebarButton
          icon={<User size={22} />}
          label="Profile"
          value="profile"
          selected={selected}
          onSelect={(value) => {
            setSelected(value);
            navigate("/profile");
          }}
        />
      </div>
    </aside>
  );
}

export default SideNavBar;
