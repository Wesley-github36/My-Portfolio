import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial as TShaderMaterial } from "three";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap"

import { camera, lerp, lerpPos } from "@util/index";
import useScroll from "@hooks/useScroll";
import useLayout from "@hooks/useLayout";
import ShaderMaterial from "@components/ShaderMaterial";


const margin    = 25,
      amplitude = 0.25
let animated    = false
let time = 0;

let posIndex: number | undefined = undefined


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


    // const doScale = () => {
    //     const queryWidthX850  = DOMWidth2THREEUnits( 850, viewport.width )
    //     const queryWidthX568  = DOMWidth2THREEUnits( 568, viewport.width )
    //     const queryHeightX430 = DOMHeight2THREEUnits( 530, viewport.height )
    //     const queryHeightX768 = DOMHeight2THREEUnits( 768, viewport.height )
    //
    //     let meshHeight = 0.76 * viewport.height;
    //     let meshWidth  = 0.8 * viewport.width;
    //
    //     if ( isMobile && height > queryHeightX768 ) {
    //         meshHeight = Math.min( meshHeight, queryWidthX568 )
    //         meshWidth  = Math.min( meshWidth, queryWidthX568 )
    //     }
    //
    //     if ( !isMobile ) {
    //         meshWidth  = queryWidthX850
    //         meshHeight = queryHeightX430
    //     }
    //
    //     return [ meshWidth, meshHeight, 1 ]
    // }
    // const scale   = doScale()

	const onNavigate = () => {
        const abZ = Math.abs( ref.current.position.z )

        if ( 0 <= abZ && abZ <= 100 )
            navigate( `/work/${ link }` )
    }

    useEffect( () => {
        gsap.from( ref.current.material, {
            duration  : 1,
            ease      : "expo.out",
            onUpdate  : () => {
                // @ts-ignore
                ref.current.material.uniforms.uAlpha.value += 0.1
            },
            onComplete: () => {
                animated = true;
            }
        } )


    }, [] )
    useFrame( () => {


        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;

        const absZ    = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, margin ) / margin;


        if ( animated )
            ( ref.current.material as TShaderMaterial ).uniforms.uAlpha.value = 1 - opacity;

        ref.current.position.z = lerpPos( length, index, margin, states.current.position ) - 0.01
        ref.current.rotation.z = camera.angle - ( amplitude * Math.sin( states.current.position ) )



    } )


    return (
        <mesh
            ref={ ref }
            //@ts-ignore
            scale={ [1, 1, 1] }
            onClick={ () => onNavigate() }
        >
            <planeGeometry args={ [ 1, 1, 300, 300 ] } />
            <ShaderMaterial
                image={ image }
                size={ [1, 1] }
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
