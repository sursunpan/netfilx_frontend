import apiService from "@/services/apiService";
import { signoutSuccess } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable @next/next/no-img-element */
interface AccountMenuProps {
  visible?: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const dispatch = useDispatch();
  const [profileState, setProfileState] = useState<UserProfile | null>(null);

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

  const signOut = () => {
    dispatch(signoutSuccess());
  };
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/defaultblue.jpg"
            alt="profile"
            className="w-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/items:underline">
            {profileState?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={signOut}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
