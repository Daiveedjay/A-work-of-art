import Play from "../media/icon-play.svg";
import Pause from "../media/icon-pause.svg";
import Prev from "../media/icon-prev.svg";
import Next from "../media/icon-next.svg";
import "./Music.css";

import React, { useState, useRef, useEffect } from "react";

const SongChoices = [
  {
    src: "/audio/Le nozze di Figaro, K. 492  Act 3 Sull’aria.mp3",
    name: "Le nozze di Figaro, K. 492  Act 3 Sull’aria",
    id: 1,
  },
  {
    src: "/audio/Piano Concerto No. 21 in C Major, K. 467 2. Andante.mp3",
    name: "Piano Concerto No. 21 in C Major",
    id: 2,
  },
  {
    src: "/audio/Sonata No 14 Moonlight in C Sharp Minor Op 27.mp3",
    name: "Sonata No 14 Moonlight in C Sharp Minor Op 27",
    id: 3,
  },
  {
    src: "/audio/Symphony No 5 in C Minor Op 67.mp3",
    name: "Symphony No 5 in C Minor Op 67",
    id: 4,
  },
];

export default function Music() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const audioRef = useRef(null);
  const [isplaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.src =
      process.env.PUBLIC_URL + SongChoices[currentSongIndex].src;
    playSong();
  }, [currentSongIndex]);

  useEffect(() => {});

  const playSong = () => {
    audioRef.current.play();
    // console.log(audioRef.current);
    setIsPlaying(true);
  };

  const stopSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : prevIndex;
    });
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => {
      return prevIndex < SongChoices.length - 1 ? prevIndex + 1 : 0;
    });
  };

  return (
    <div className="utility__container">
      <div className="song__container">
        <div className="song--name">
          <span> #{SongChoices[currentSongIndex].id}</span>
          {SongChoices[currentSongIndex].name}
        </div>
        <audio ref={audioRef} />
        <div className="song__controls">
          <img onClick={prevSong} src={Prev} alt="" />
          {!isplaying && <img onClick={playSong} src={Play} alt="" />}

          {isplaying && <img onClick={stopSong} src={Pause} alt="" />}

          <img onClick={nextSong} src={Next} alt="" />
        </div>
      </div>
    </div>
  );
}
