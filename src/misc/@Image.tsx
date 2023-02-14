import React, { useReducer, useRef } from "react";
import ShaderMaterial from "@components/ShaderMaterial";
import { Mesh, Texture } from "three";
import { useTexture } from "@react-three/drei";
import useLayout from "@hooks/useLayout";
import { useThree } from "@react-three/fiber";


const Image = (
    {
        padding,
        image,
        width,
        height,
        index
    }: Props
) => {
    const ref          = useRef<Mesh>( null! );
    const { viewport } = useThree( state => state )
    const { isMobile } = useLayout()

    const distanceFromTop = window.innerHeight / 2 - height;
    const pos             = isMobile ? [ 0, ( height + padding ) * -index, 0 ] : [ ( width + padding ) * index, 0, 0 ]

    return (
        <mesh
            ref={ ref }
            scale={ [ width, height, 1 ] }
        >
            <planeGeometry args={ [ 1, 1, 8, 8 ] } />
            <ShaderMaterial
                image={ image }
                size={ [ width, height ] }
            />
        </mesh >
    )
}

export default Image;


type Props = {
    padding: number,
    image: any,
    width: number,
    height: number,
    index: number
}
