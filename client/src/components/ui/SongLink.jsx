import React from "react";

import { Link } from "wouter";
import useGameStore from "../../shared/gameStore";

const SongLink = ({ songName, songFileName }) => {
  const setSelectedSong = useGameStore((state) => state.setSelectedSong)
  const onclick = () => setSelectedSong(songFileName)

  return (
    <Link to={"/game"} onClick={onclick}>
        {songName}
    </Link>
  )
} 

export default SongLink