import { useState } from "react";
import { User } from "../../types/userType";
import { updateProfile } from "../../services/UserService";
type EditProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate:(user:User)=> void;
};

function EditProfileModal({ isOpen, onClose, user, onUpdate }: EditProfileModalProps) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || "");
  const [github, setGithub] = useState(user.github || "");
  const [linkedin, setLinkedin] = useState(user.linkedin || "");

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

 const handleSave = async () => {
   try {
     const formData = new FormData();

     formData.append("name", name);
     formData.append("bio", bio);
     formData.append("github", github);
     formData.append("linkedin", linkedin);

     if (imageFile) {
       formData.append("profilePic", imageFile);
     }

     const response = await updateProfile(formData);

     console.log(response);
onUpdate(response.user);
     onClose();
   } catch (error) {
     console.error(error);
   }
 };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-[#151E16] border border-[#333B33] rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <label className="relative cursor-pointer">
            <img
              src={
                previewImage ||
                (user.profilePic
                  ? `http://localhost:3000${user.profilePic}`
                  : "/default-avatar.png")
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-[#25D366]"
            />

            <div className="absolute bottom-0 right-0 bg-[#25D366] p-2 rounded-full">
              📷
            </div>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          <p className="text-sm text-[#8B9389] mt-2">
            Click image to change profile picture
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none focus:border-[#25D366]"
          />

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            rows={4}
            className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl px-4 py-3 text-white resize-none outline-none focus:border-[#25D366]"
          />

          <input
            type="text"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="GitHub URL"
            className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none focus:border-[#25D366]"
          />

          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="LinkedIn URL"
            className="w-full bg-[#0D150E] border border-[#333B33] rounded-xl px-4 py-3 text-white outline-none focus:border-[#25D366]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-[#333B33] rounded-xl text-white hover:bg-[#333B33]"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-[#25D366] text-black rounded-xl font-semibold hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
