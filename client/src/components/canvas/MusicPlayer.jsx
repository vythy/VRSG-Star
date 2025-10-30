import React, { useEffect, useRef } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

import useGameStore from "../../shared/gameStore";
import useLoginStore from "../../shared/loginStore";
import { post } from "../../utilities";

const MusicPlayer = () => {
    const selectedSong = useGameStore((state) => state.selectedSong)
    const startButtonRef = useRef(null)
    const setGameStart = useGameStore((state) => state.setGameStart)
    const mapScore = useGameStore((state) => state.score)

    const userId = useLoginStore((state) => state.userId)

    const { load, stop } = useGlobalAudioPlayer()

    const onPlay = () => setGameStart(true)
    const onEnd = () => {
        setGameStart(false)
        stop()
        post("/api/totalscore", { userid: userId, addScoreAmount: mapScore})
    }

    const handleSongPlayButton = () => {
        startButtonRef.current.style.display = "none"
        load(`/Songs/${selectedSong}/audio.mp3`, {autoplay: true, onplay: onPlay, onend: onEnd})
    }

    return (
        <div ref={startButtonRef} style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>
            <button onClick={handleSongPlayButton}>Click To Start</button>
        </div>
    )
}


export default MusicPlayer;