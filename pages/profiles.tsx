import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

const Profiles = () => {
  const [profileState, setProfileState] = useState<UserProfile | null>(null);
  const router = useRouter();
  const currentUser = async () => {
    try {
      const response = await apiService.get("/me");
      if (!response.error) {
        setProfileState(response.user);
      } else {
        console.error("Error fetching current user:", response.message);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    if (!profileState) {
      currentUser();
    }
  }, [profileState]);

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div
                className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden
                    "
              >
                <img src="/images/defaultblue.jpg" alt="default profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {profileState?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
