import apiService from "@/services/apiService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface MovieVariable {
  title: string;
  videoUrl: string;
}

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [currentMovie, setCurrentMovie] = useState<MovieVariable | null>(null);

  useEffect(() => {
    console.log("movieId:", movieId); // Log movieId to debug
    if (movieId) {
      movieById(movieId);
    }
  }, [movieId]);

  const movieById = async (id: any) => {
    try {
      const response = await apiService.get(`/movie/${id}`);
      if (!response.error) {
        setCurrentMovie(response.movie);
      }
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    }
  };

  if (!currentMovie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          className="text-white"
          size={40}
          onClick={() => router.push("/")}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {currentMovie.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full cursor-pointer"
        src={currentMovie.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
