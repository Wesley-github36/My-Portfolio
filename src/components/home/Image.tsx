import React, { useRef } from "react";
import { Mesh } from "three";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


import useTile from "@hooks/useTile";
import useScroll from "@hooks/useScroll";
import { camera, resetPos, store } from "@util/index";
import { useNavigate } from "react-router-dom";


const cols      = 8,
      rows      = 8,
      margin    = 1000,
      amplitude = 0.25

let output;

const Image = (
    {
        image,
        index,
        length,
        link,
    }: ImageProps
) => {

    const ref                  = useRef<Mesh>( null! )
    const { bounds, material } = useTile( image )
    const states               = useScroll();
    const navigate             = useNavigate();

    const onNavigate = () => {
        const absZ = Math.abs( ref.current.position.z )

        if ( 0 <= absZ && absZ < 100 )
            navigate( `/work/${ link }` )
    }

    useFrame( () => {

        const absZ    = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, margin ) / margin;

        if ( 0 <= absZ && absZ < 100 )
            output = Math.ceil( absZ )
        else if ( 100 <= absZ && absZ < 200 )
            output = Math.floor( absZ )
        else output = undefined

        if ( output )
            store.index = index

        if ( material )
            material.uniforms.uAlpha.value = 1 - opacity;

        ref.current.position.z = resetPos( length, index, margin, states.position ) - 0.01
        ref.current.rotation.z = camera.angle - ( amplitude * Math.sin( states.position ) )

    } )

    return (
        <>
            <Plane
                ref={ ref }
                material={ material }
                scale={ [ bounds.width, bounds.height, 1 ] }
                args={ [ 1, 1, cols, rows ] }
                onClick={ () => onNavigate() }
            />

        </>
    )
}

export default Image;


type ImageProps = {
    image: any,
    index: number,
    length: number,
    link: string,
}
