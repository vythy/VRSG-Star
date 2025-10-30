import React, { useEffect } from "react"

import "./GamePage.css"
import MusicPlayer from "../canvas/MusicPlayer";
import NavButton from "../ui/NavButton";

import GameScene from "../scenes/GameScene";
import { useGlobalAudioPlayer } from "react-use-audio-player";

const GamePage = () => {
  const { stop } = useGlobalAudioPlayer()

  return (
    <>
      <GameScene/>
      <MusicPlayer/>
      <div style={{position: "absolute", top: 0, left: 0}}>
        <NavButton destination="/song-select" prompt="back" callback={stop}/>
      </div>
    </>
  );
}

export default GamePage;