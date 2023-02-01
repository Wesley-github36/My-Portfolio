import React, { useEffect, useRef, useState } from "react";
import { Mesh, ShaderMaterial, TextureLoader } from "three";
import { useFrame } from "@react-three/fiber";

import useScroll from "@hooks/useScroll";
import { camera, resetPos } from "@util/index";
import { useNavigate } from "react-router-dom";
import { Plane } from "@react-three/drei";
import useMaterial from "@hooks/useMaterial";


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
        link
    }: ImageProps
) => {


    const ref                  = useRef<Mesh>( null! )
    const states               = useScroll();
    const navigate             = useNavigate();
    const { material, bounds } = useMaterial( { selector: ".js-slide", img: image } )

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

        if ( ref.current )
            ( ref.current.material as ShaderMaterial ).uniforms.uAlpha.value = 1 - opacity;

        ref.current.position.z = resetPos( length, index, margin, states.position ) - 0.01
        ref.current.rotation.z = camera.angle - ( amplitude * Math.sin( states.position ) )

    } )

    return (

        <Plane
            ref={ ref }
            scale={ [ bounds.width, bounds.height, 1 ] }
            args={ [ 1, 1, rows, cols ] }
            material={ material }
            onClick={ () => onNavigate() }
        />
    )
}

export default HomeImage;


type ImageProps = {
    image: any,
    index: number,
    length: number,
    link: string,
}
