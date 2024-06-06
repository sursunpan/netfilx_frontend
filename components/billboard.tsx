import apiService from "@/services/apiService";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./playButton";
import { openModal } from "@/store/slices/modalSlice";
import { useDispatch } from "react-redux";

interface Movie {
  _id: any;
  videoUrl: string;
  thumbnailUrl: string;
  description: string;
  title: string;
}

const Billboard = () => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await apiService.get("/randomMovies");
        if (response.error === false) {
          setMovie(response.movie);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, []);

  console.log(movie);

  const handleOpenModal = useCallback(() => {
    dispatch(openModal(movie?._id));
  }, [dispatch, movie?._id]);
  return (
    <div className="relative h-[56.25vw]">
      <video
        className="
        w-full h-[56.25vw] object-cover brightness-[60%] transition
        "
        autoPlay
        muted
        loop
        src={movie?.videoUrl}
        poster={movie?.thumbnailUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movie?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {movie?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie?._id} />
          <button
            onClick={handleOpenModal}
            className="bg-white text-white bg-opacity-30 rounded-md py1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
