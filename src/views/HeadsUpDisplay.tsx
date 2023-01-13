import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import { Props } from "./Home";
import Projects from "@data/Projects";
import Title from "./Title";

const HeadsUpDisplay = ( { states }: Props ) => {

    const { camera } = useThree()
    const scene = useRef<Scene>( null! );

    useFrame( ( { gl } ) => {
        gl.clearDepth()
        gl.render( scene.current, camera )

    }, 2 )

    return (
        <scene
            ref={ scene }
        >
            { Projects.map( ( { avatar, title }, index ) => (
                <Title
                    key={ `title-${ index }` }
                    number={ index }
                    text={ title }
                    index={ index }
                    length={ Projects.length }
                    states={ states }
                />
            ) ) }
        </scene >
    )
}

export default HeadsUpDisplay;
