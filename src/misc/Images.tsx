import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import Projects from "@data/Projects";
import Image from "./Image";

const Images = () => {
    const scene      = useRef<Scene>( null! )
    const { camera } = useThree();


    //this scene will render first.
    //it will be placed beneath
    useFrame( ( { gl } ) => {
        gl.render( scene.current, camera )

    }, 1 )

    return (
        <scene ref={ scene } >
            <group >
                {
                    Projects.map( ( project, index ) => (
                        <Image
                            key={ `home-image-${ index }` }
                            index={ index }
                            link={ project.link }
                            length={ Projects.length }
                        />
                    ) )
                }
            </group >
        </scene >
    )
}

export default Images;
