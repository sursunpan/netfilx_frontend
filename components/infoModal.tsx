import apiService from "@/services/apiService";
import { RootState } from "@/store";
import { closeModal } from "@/store/slices/modalSlice";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import PlayButton from "./playButton";
import FavoriteButton from "./favoriteButton";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

interface MovieVariable {
  description: string;
  genre: string;
  duration: string;
  _id: any;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);
  const [isVisible, setIsVisible] = useState(!!visible);
  const [currentMovie, setCurrentMovie] = useState<MovieVariable | null>(null);

  useEffect(() => {
    if (modalState.movieId) {
      movieById(modalState.movieId);
    }
  }, [modalState.movieId]);

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

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 300);
  }, [dispatch]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
    z-50
    transition
    duration-300
    bg-black
    bg-opacity-80
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    fixed
    inset-0
    "
    >
      <div
        className="relative
      w-auto
      mx-auto
      max-w-3xl
      rounded-md
      overflow-hidden"
      >
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              src={currentMovie?.videoUrl}
              poster={currentMovie?.thumbnailUrl}
              autoPlay
              muted
              loop
            ></video>
            <div
              className="cursor-pointer
              absolute
              top-3
              right-3
              h-10
              w-10
              rounded-full
              bg-black
              bg-opacity-70
              flex
              items-center
              justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {currentMovie?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={currentMovie?._id} />
                <FavoriteButton movieId={currentMovie?._id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{currentMovie?.duration}</p>
            <p className="text-white text-lg">{currentMovie?.genre}</p>
            <p className="text-white text-lg">{currentMovie?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
