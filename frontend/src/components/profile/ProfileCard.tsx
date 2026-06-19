import { Share2, Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { User } from "../../types/userType";
import { useState } from "react";
import EditProfileModal from "./editProfileModal";
import Swal from "sweetalert2";
type IdentityCardProps = {
  user: User;
  setUser: (user: User) => void;
};
const IdentityCard = ({ user, setUser }: IdentityCardProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const externalLinks = [
    {
      label: user.github,
      icon: <FaGithub size={14} />,
      url: user.github,
    },
    {
      label: user.linkedin,
      icon: <FaLinkedin size={14} />,
      url: user.linkedin,
    },
  ].filter((link) => link.label && link.url);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      text: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      Swal.fire("Cancelled", "You are still logged in", "info");
    }
  };
  return (
    <div className="w-full h-full bg-[#151E16] border border-[#333B33] rounded-3xl p-10 overflow-y-auto">
      {/* Profile Image & Status */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="relative mb-6">
          <div className="w-36 h-36 rounded-[2.5rem] bg-gradient-to-br from-[#25D366]/20 to-[#333B33] border-2 border-[#333B33] overflow-hidden p-1">
            <img
              src={
                user.profilePic
                  ? `http://localhost:3000${user.profilePic}`
                  : "/default-avatar.png"
              }
              alt={user.name}
              className="w-full h-full object-cover rounded-[2.2rem]"
            />
          </div>
          {/* <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-[#25D366] border-[6px] border-[#151E16] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-[#0D150E] rounded-full animate-pulse" />
          </div> */}
        </div>

        <h2 className="text-3xl font-bold mb-1 tracking-tight">{user.name}</h2>

        {/* Nexa ID Section */}
        <div className="w-full bg-[#0D150E] border border-[#333B33] rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-[#8B9389] uppercase tracking-widest">
              Unique Nexa ID
            </span>
            <button className="text-[#25D366] hover:bg-[#25D366]/10 p-1.5 rounded-lg transition-colors">
              <Share2 size={14} />
            </button>
          </div>
          <div className="text-xl font-mono font-bold text-[#E1E3DF]">
            {user.nexaId || "Not Assigned"}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            className="bg-[#25D366] text-[#0D150E] font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all active:scale-95"
            onClick={() => setIsModal(true)}
          >
            Edit Profile
          </button>
          <EditProfileModal
            isOpen={isModal}
            onClose={() => setIsModal(false)}
            user={user}
            onUpdate={setUser}
          />
          <button className="bg-[#333B33]/50 text-[#E1E3DF] font-bold py-3.5 rounded-xl text-sm border border-[#333B33] hover:bg-[#333B33] transition-all">
            View Public
          </button>
        </div>
        <div className="w-full mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 py-3 rounded-xl font-semibold hover:bg-red-500/20 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-8 pt-8 border-t border-[#333B33]">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B9389] mb-3 block">
            About / Bio
          </label>
          <p className="text-sm leading-relaxed text-[#C1C9BE]">
            {user.bio || "No bio added yet"}
          </p>
        </div>

        {/* External Links */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#8B9389] mb-4 block">
            External Links
          </label>
          <div className="space-y-3">
            {externalLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[#25D366] hover:underline"
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
            {/* <button className="flex items-center gap-2 text-xs font-bold text-[#8B9389] hover:text-[#E1E3DF] pt-2">
              <Plus size={14} /> Add New Link
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityCard;
