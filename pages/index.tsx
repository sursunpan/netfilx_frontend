import Billboard from "@/components/billboard";
import InfoModal from "@/components/infoModal";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import apiService from "@/services/apiService";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/modalSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
}

export default function Home() {
  const [profileState, setProfileState] = useState<UserProfile | null>(null);
  const [movieList, setMovieList] = useState([]);
  const [FavoriteList, setFavoriteList] = useState([]);
  const modalState = useSelector((state: RootState) => state.modal);

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

  const movies = async () => {
    try {
      const response = await apiService.get("/movies");
      if (response.error === false) {
        setMovieList(response.movies);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    movies();
  }, []);

  const favoriteMovie = async () => {
    try {
      const response = await apiService.get("/allfavouritesmovie");
      if (response.error === false) {
        setFavoriteList(response.favouriteMovies);
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  useEffect(() => {
    favoriteMovie();
  }, []);

  return (
    <>
      <InfoModal visible={modalState.isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movieList} />
        <MovieList title="My List" data={FavoriteList} />
      </div>
    </>
  );
}
