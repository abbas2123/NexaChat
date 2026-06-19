import { useEffect, useState } from "react";
import ProfileCard from "./profile/ProfileCard";
import { getProfile } from "../services/UserService";
import { User } from "../types/userType";

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    loadProfile();
  }, []);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0D150E]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#333B33] border-t-[#25D366] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#E1E3DF] font-medium">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        <ProfileCard user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default Profile;
