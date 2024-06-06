import Home from "@/pages";
import apiService from "@/services/apiService";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

interface CurrentUser {
  favoriteIds: any;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const fetchCurrentUser = async () => {
    try {
      const response = await apiService.get("/me");
      if (response.error === false) {
        setCurrentUser(response.user);
      } else {
        console.error("Error fetching current user:", response.message);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    console.log("favList--->", list);
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await apiService.post(
        "/removefavourite",
        JSON.stringify({ movieId })
      );
    } else {
      response = await apiService.post(
        "/makefavourite",
        JSON.stringify({ movieId })
      );
    }
    if (!response.error) {
      setCurrentUser((prevUser) => {
        if (!prevUser) return prevUser;

        const updatedFavoriteIds = isFavorite
          ? prevUser.favoriteIds.filter((id: any) => id !== movieId)
          : [...prevUser.favoriteIds, movieId];
        return { ...prevUser, favoriteIds: updatedFavoriteIds };
      });
    } else {
      console.error("Error toggling favorite:", response.message);
    }
  }, [isFavorite, movieId]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
