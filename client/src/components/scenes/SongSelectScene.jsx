import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei"

const SongSelectScene = () => {
    return (
    <Canvas>
        <Stars fade speed={3}/>
    </Canvas>
    )
}

export default SongSelectScene;