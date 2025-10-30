import React, { useRef, useState } from "react";

import useGameStore from "../../../shared/gameStore";
import { useFrame } from "@react-three/fiber";
import { Instance } from "@react-three/drei";
import useKeyPress from "../../hooks/useKeyboard";

import * as THREE from 'three';

const perfectColor = new THREE.Color().setRGB(2, 0, 2)
const missColor = new THREE.Color().setRGB(2, 0, 0)

const endz = 1.18
const endzBuffer = 0.25

const interactWindow = 129.5 // in ms
const hitWindow = 70 // in ms

const laneToKBState = {
    1: "d",
    2: "f",
    3: "j",
    4: "k"
}

const Note = ({ position, lane, hitTimeStamp }) => {
    const [ initialPosition ] = useState(position)
    const [ hitTime ] = useState(hitTimeStamp)
    const [ hitLane ] = useState(lane)

    const hit = useRef(false)
    const keyBoard = useKeyPress()
    const noteRef = useRef(null)

    useFrame((state, delta) => {
        const currentZPos = noteRef.current.position.z
        if (hit.current && currentZPos <= endz + endzBuffer) {
            noteRef.current.position.z = 10 // random out of view num
            return
        }

        if (currentZPos <= endz + endzBuffer && !hit.current) {
            const gameStore = useGameStore.getState()
        
            const songPos = gameStore.songPosition
            noteRef.current.position.z = initialPosition[2] + ((songPos/hitTime) * (endz - initialPosition[2]))

            if (currentZPos >= endz - 0.1) {
                const timeDiff = Math.abs(songPos - hitTime)
                if (keyBoard[laneToKBState[hitLane]] && timeDiff <= interactWindow) {
                    hit.current = true
                    if (timeDiff > hitWindow) {
                        noteRef.current.color = missColor
                    } else if (timeDiff <= hitWindow) {
                        noteRef.current.color = perfectColor
                        gameStore.incrementScore()
                    }
                }
            }
        }
    })

    return <Instance ref={noteRef} position={position} color={[0, 0.25, 1.25]}/>
}

export default Note;