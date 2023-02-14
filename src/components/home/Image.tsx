import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useNavigate } from "react-router-dom";
import { ShaderMaterial as TShaderMaterial } from "three";

import { camera, DOMHeight2THREEUnits, DOMWidth2THREEUnits, lerp, lerpPos } from "@util/index";
import useScroll from "@hooks/useScroll";
import useLayout from "@hooks/useLayout";
import ShaderMaterial from "@components/ShaderMaterial";
import { Plane } from "@react-three/drei";


const margin    = 50,
      amplitude = 0.25

const Image = (
    {
        image,
        link,
        width,
        height,
        index,
        length
    }: Props
) => {

    const { isMobile } = useLayout()
    const { viewport } = useThree();
    const ref          = useRef<Mesh>( null! )
    const states       = useScroll();
    const navigate     = useNavigate();

    const doScale    = () => {
        const queryWidthX850  = DOMWidth2THREEUnits( 850, viewport.width )
        const queryWidthX568  = DOMWidth2THREEUnits( 568, viewport.width )
        const queryHeightX430 = DOMHeight2THREEUnits( 530, viewport.height )
        const queryHeightX768 = DOMHeight2THREEUnits( 768, viewport.height )

        let meshHeight = 0.76 * viewport.height;
        let meshWidth  = 0.8 * viewport.width;

        if ( isMobile && height > queryHeightX768 ) {
            meshHeight = Math.min( meshHeight, queryWidthX568 )
            meshWidth  = Math.min( meshWidth, queryWidthX568 )
        }

        if ( !isMobile ) {
            meshWidth  = queryWidthX850
            meshHeight = queryHeightX430
        }

        return [ meshWidth, meshHeight, 1 ]
    }
    const scale      = doScale()

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
            //@ts-ignore
            scale={ scale }
            onClick={ () => onNavigate() }
        >
            <planeGeometry args={ [ 1, 1, 8, 8 ] } />
            <ShaderMaterial
                image={ image }
                size={ scale.slice( 0, -1 ) }
            />
        </mesh >
    )
}

export default Image;


type Props = {
    image: any
    link: string,
    width: number,
    height: number,
    index: number,
    length: number
}
