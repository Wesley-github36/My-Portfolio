import React, { useRef } from "react";
import { Group, Mesh, ShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

import useScroll from "@hooks/useScroll";
import { camera, lerp, lerpPos } from "@util/index";
import Tile from "@components/Tile";


const cols      = 8,
      rows      = 8,
      margin    = 1000,
      amplitude = 0.25

let output;

const HomeImage = (
    {
        image,
        index,
        length,
        link,
        element,
        height,
        width
    }: ImageProps
) => {


    const states   = useScroll();
    const navigate = useNavigate();
    const ref      = useRef<Group>( null! )

    const onNavigate = () => {
        const abZ = Math.abs( ref.current.position.z )

        if ( 0 <= abZ && abZ <= 100 )
            navigate( `/work/${ link }` )
    }

    useFrame( () => {

        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;

        const absZ    = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, margin ) / margin;

        if ( ref.current ) {
            const mesh                                                = ref.current.children[ 0 ] as Mesh
            ( mesh.material as ShaderMaterial ).uniforms.uAlpha.value = 1 - opacity;
        }

        ref.current.position.z = lerpPos( length, index, margin, states.current.position ) - 0.01
        ref.current.rotation.z = camera.angle - ( amplitude * Math.sin( states.current.position ) )

    } )

    return (
        <Tile
            ref={ ref }
            image={ image }
            element={ element }
            onClick={ onNavigate }
            width={ width }
            height={ height }
        />
    )
}

export default HomeImage;


type ImageProps = {
    image: any,
    index: number,
    length: number,
    link: string,
    element: HTMLImageElement,
    width: number,
    height: number
}
