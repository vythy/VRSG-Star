import React, { useRef } from "react"
import { Canvas, extend } from "@react-three/fiber";
import { Environment, PerspectiveCamera, FlyControls, OrbitControls, Wireframe, Stars } from "@react-three/drei"
import { BoxGeometry, PlaneGeometry, MeshPhongMaterial, AmbientLight, MeshStandardMaterial } from "three";

import useGameStore from "../../shared/gameStore";

import NotesController from "../canvas/Notes/NotesController";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
extend(PlaneGeometry, MeshPhongMaterial);

const GameScene = () => {
    const gameStart = useGameStore((state) => state.gameStart)
    
    return (
    <Canvas>
        <Stars count={1350} saturation={5} depth={50} factor={4} fade speed={2}/>
        <spotLight intensity={1} distance={5} angle={1} penumbra={1} position={[0, 0, 1.35]} />
        <fog color="black" attach="fog" near={1.25} far={2.5} />
        <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={1}/>
        </EffectComposer>
        <PerspectiveCamera
              makeDefault
              position={[0, 0.085, 1.365]}
              rotation={[-Math.PI*0.05, 0, 0]}
              fov={50}
        />
        <NotesController/>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
            <planeGeometry arrach="geometry" args={[0.15, 2.5, 2.5, 1]} />
            <meshPhongMaterial/>
        </mesh>
        <mesh position={[0, 0.0001, 1.19]}>
            <boxGeometry args={[0.15, 0.001, 0.001]} />
            <meshStandardMaterial color={[1,1,0]}/>
        </mesh>
    </Canvas>
    )
}

export default GameScene;