import React, { useRef, useEffect } from "react";
import { Box, Flex } from "@react-three/flex";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Scene } from "three";
import { gsap } from "gsap";

import Projects from "@data/Projects";
import Image from "@components/home/Image";


const Images = () => {

    const { viewport } = useThree()
    const box          = useRef<Group>( null! )
    const scene        = useRef<Scene>( null! )

    useEffect( () => {
        gsap.from( box.current.position, {
            z       : -25,
            duration: 1,
            ease    : "expo.out"
        } )
    }, [] )

    useFrame(({ gl, camera }) => {

        gl.clearDepth()
        gl.render( scene.current, camera )
    }, 1 )

    return (
        <scene ref={ scene } >
            <Flex
                position={ [ -viewport.width / 2, viewport.height / 2, 0 ] }
                size={ [ viewport.width, viewport.height, 0 ] }
            >
                <Box
                    ref={ box }
                    dir={ "column" }
                    width={ "100%" }
                    height={ "100%" }
                    centerAnchor
                >
                    { ( width, height ) => (
                        Projects.map( ( project, index ) => (
                            <Image
                                key={ `image-${ index }` }
                                image={ project.avatar }
                                link={ project.link }
                                width={ width }
                                height={ height }
                                index={ index }
                                length={ Projects.length }
                            />
                        ) )
                    ) }
                </Box >
            </Flex >
        </scene >
    )
}

export default Images;
