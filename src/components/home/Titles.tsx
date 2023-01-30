import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import Projects from "@data/Projects";
import Title from "@components/home/Title";


const Titles = () => {

    const scene = useRef<Scene>( null! )
    const { camera } = useThree()

    useFrame( ( { gl } ) => {
        gl.clearDepth()
        gl.render( scene.current, camera )

    }, 2 )

    return (
        <scene
            ref={ scene }
        >
            <group >

                { Projects.map( ( { title, link }, index ) =>
                    <Title
                        key={ "title-" + index }
                        index={ index }
                        length={ Projects.length }
                        title={ title }
                        link={ link }
                    />
                ) }

            </group >
        </scene >
    )
}

export default Titles;
