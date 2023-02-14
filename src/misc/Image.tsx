import React, { useRef } from "react";
import { Mesh, ShaderMaterial as TShaderMaterial } from "three";
import { useFrame } from "@react-three/fiber";

import useScroll from "@hooks/useScroll";
import { camera, lerp, lerpPos } from "@util/index";
import ShaderMaterial from "@components/ShaderMaterial";
import { useNavigate } from "react-router-dom";

const cols      = 8,
      rows      = 8,
      margin    = 1000,
      amplitude = 0.25

const Image = (
    {
        index,
        length,
        link
    }: Props
) => {

    const element           = document.querySelector( `[ data-slide-image-link=${ link } ]` ) as HTMLImageElement;
    const { width, height } = element.getBoundingClientRect()

    const ref      = useRef<Mesh>( null! )
    const states   = useScroll();
    const navigate = useNavigate()

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

        ( ref.current.material as TShaderMaterial ).uniforms.uAlpha.value = 1 - opacity;
        ref.current.position.z                                            = lerpPos( length, index, margin, states.current.position ) - 0.01
        ref.current.rotation.z                                            = camera.angle - ( amplitude * Math.sin( states.current.position ) )

    } )

    return (
        <mesh
            ref={ ref }
            scale={ [ width, height, 1 ] }
            onClick={ () => onNavigate() }
        >
            <planeGeometry args={ [ 1, 1, rows, cols ] } />
            <ShaderMaterial
                image={ element.src }
                size={ [ width, height ] }
                imageNaturalSize={ [ element.naturalWidth, element.naturalWidth ] }
            />
        </mesh >
    )
}

export default Image;


//Prop types
type Props = {
    index: number,
    length: number,
    link: string,
}
