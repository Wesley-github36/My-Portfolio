import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import Projects from "@data/Projects";
import Image from "@components/home/Image";


const Images = () => {

    const scene = useRef<Scene>( null! )
    const { camera } = useThree();

    useFrame( ( { gl } ) => {
        gl.render( scene.current, camera )

    }, 1 )

    return (
        <scene
            ref={ scene }
        >
            <group >
                { Projects.map( ( { avatar, link }, index ) => (
                    <Image
                        key={ "image-" + index }
                        index={ index }
                        length={ Projects.length }
                        image={ avatar }
                        link={ link }
                    />
                ) ) }
            </group >
        </scene >
    )
}

export default Images;
