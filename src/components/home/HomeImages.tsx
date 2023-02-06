import React, { useRef } from "react";
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";

import Projects from "@data/Projects";

import HomeImage from "@components/home/HomeImage";
import { getBoundingRect } from "@util/index";


const HomeImages = () => {

    const scene      = useRef<Scene>( null! )
    const { camera } = useThree();

    const rect = getBoundingRect( ".js-slide", ".js-slide-image" )

    useFrame( ( { gl } ) => {
        gl.render( scene.current, camera )

    }, 1 )

    return (
        <scene
            ref={ scene }
        >
            <group >
                {
                    rect.map( ( entry, index ) => (
                        <HomeImage
                            key={ `home-image-${ index }` }
                            image={ entry.imageElement.src }
                            index={ index }
                            length={ rect.length }
                            link={ entry.imageElement.getAttribute( "data-slide-image-link" ) ?? "" }
                            element={ entry.imageElement }
                            width={ entry.width }
                            height={ entry.height }
                        />
                    ) )
                }

            </group >
        </scene >
    )
}

export default HomeImages;
