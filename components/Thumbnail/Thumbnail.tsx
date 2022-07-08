import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
import { Movie } from "../../typings";

interface Props {
  //When using firebase use multi type
  movie: Movie | DocumentData;
  // movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition
    duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt={movie.title}
      />
    </div>
  );
};

export default Thumbnail;
