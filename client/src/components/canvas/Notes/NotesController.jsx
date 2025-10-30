import React, { useEffect, useState } from "react";

import { Instance, Instances } from "@react-three/drei";

import Note from "./Note";
import useGameStore from "../../../shared/gameStore";
import { get } from "../../../utilities";
import { useGlobalAudioPlayer, useAudioPlayer } from "react-use-audio-player";
import { useFrame } from "@react-three/fiber";

const NotesController = () => {
    const gameStart = useGameStore((state) => state.gameStart);
    const selectedSong = useGameStore((state) => state.selectedSong);
    const [mapObjects, setMapObjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { getPosition } = useGlobalAudioPlayer();

    useEffect(() => {
        get("/api/request-song", {songName: selectedSong}).then((songData) => {
            setMapObjects(songData.mapObjects);
            setIsLoading(false);
        })

        return () => {
            setIsLoading(true);
            setMapObjects([]);
        }
    }, [selectedSong, gameStart]);

    useFrame(() => {
        useGameStore.getState().setSongPosition(getPosition()*1000);
    });

    if (isLoading) return
    return (
        <Instances limit={mapObjects.length}>
            <boxGeometry args={[0.0325, 0.005, 0.03]} />
            <meshStandardMaterial/>
            {mapObjects.map((noteData, index) => (
                <Note key={index} position={noteData[0]} lane={noteData[1]} hitTimeStamp={noteData[2]}/>
            ))}
        </Instances>
    )
}

export default NotesController;