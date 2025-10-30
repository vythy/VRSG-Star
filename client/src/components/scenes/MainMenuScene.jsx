import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, useTexture } from "@react-three/drei"
import axios from "axios"
import { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three"

const Constellations = () => {
    const meshRef = useRef();
    const noiseTexture = useTexture("/textures/noise.png");

    const [constellationVertex, setConstellationVertex] = useState("");
    const [constellationFragment, setConstellationFragment] = useState("");

    useEffect(() => {
        axios.get("/shaders/menu/constellations.vert").then((res) => setConstellationVertex(res.data));
        axios.get("/shaders/menu/constellations.frag").then((res) => setConstellationFragment(res.data));
        console.log("constellation mounted");
    }, []);

    useFrame((state) => { 
        let time = state.clock.getElapsedTime();
        if (meshRef.current !== undefined) meshRef.current.material.uniforms.iTime.value = time;
    });

    const uniforms = useMemo(() => ({
        iTime: {
            type: "f", 
            value: 1.0
        },
        iResolution: { 
            type: "v2",
            value: new THREE.Vector2(19.2, 19.2 * 3/5) 
        },
        iChannel0: {
            type: "t",
            value: noiseTexture
        }
    }), []);

    if (constellationVertex === "" || constellationFragment === "") return;
    return ( 
        <mesh ref={meshRef}> 
            <planeGeometry args={[19.2, 19.2 * 3/5]} />
            <shaderMaterial 
                uniforms={uniforms}
                vertexShader={constellationVertex} 
                fragmentShader={constellationFragment}
                side={THREE.DoubleSide} 
            />
        </mesh>
    );
}

const MainMenuScene = () => {
    return (
    <Canvas>
        <Constellations/>
    </Canvas>
    );
}

export default MainMenuScene;