import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import Images from "./Images";

const MainDisplay = () => {

    const scene = useRef<Scene>( null! );
    const { camera } = useThree();

    useFrame( ( { gl } ) => {
        gl.render( scene.current, camera )

    }, 1 )

    return (
        <scene
            ref={ scene }
        >
            <ambientLight />
            <Images />
        </scene >
    )
}

export default MainDisplay;
