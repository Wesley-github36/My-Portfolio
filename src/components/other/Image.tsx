import React, { useRef, useState, useEffect } from "react";
import { Mesh, Vector2 }                      from "three";
import { useFrame }                           from "@react-three/fiber";
import { gsap }                               from "gsap"

import ShaderMaterial                                 from "@components/ShaderMaterial";
import { camera, PixelsToUnits, lerp, lerpPos } from "@util/index";
import useScroll                                      from "@hooks/useScroll";
import { useFlexSize }                                from "@react-three/flex";
import { useNavigate }                                from "react-router-dom";
import { useSpring }                                  from "@react-spring/web";
import useLayout                                      from "@hooks/useLayout";


const margin    = 30;
const amplitude = 0.25

const Image = (
    {
        image,
        index,
        projectCount,
        link,
        onAnimate
    }: Props
) => {

    const mesh                               = useRef<Mesh>( null! )
    const states                             = useScroll( 0.005 )
    const [ width, height ]                  = useFlexSize()
    const { isMobile, isTabletS, isTabletL } = useLayout()

    useEffect( () => {

        gsap.to( mesh.current.material.uniforms.uAlpha, {
            value   : onAnimate ? 0 : 1,
            duration: 1
        } )

    }, [ onAnimate ] )

    const [ mobMaxHeight, tabMaxHeight, desMaxHeight, xDesMaxHeight ]
              = PixelsToUnits( [ 568, 360, 400, 550 ], width )
    const [ mobMaxWidth, tabMaxWidth, desMaxWidth, xDesMaxWidth ]
              = PixelsToUnits( [ 500, 360, 625, 900 ], width )


    let sWidth, sHeight;

    if ( isMobile )
        sWidth = Math.min( 0.68 * width, mobMaxWidth )
    else if ( isTabletS )
        sWidth = tabMaxWidth
    else if ( isTabletL )
        sWidth = Math.min( 0.8 * width, desMaxWidth );
    else sWidth = xDesMaxWidth


    if ( isMobile )
        sHeight = Math.min( 0.74 * height, mobMaxHeight )
    else if ( isTabletS )
        sHeight = tabMaxHeight
    else if ( isTabletL )
        sHeight = Math.min( 0.58 * width, desMaxHeight );
    else sHeight = xDesMaxHeight

    useFrame( () => {
        const { start, speed } = lerp( states.current.position, states.current.speed )

        states.current.position = start;
        states.current.speed    = speed;

        mesh.current.position.z = lerpPos( projectCount, index, margin, states.current.position ) + 0.01
        //mesh.current.rotation.z = camera.angle - ( amplitude * Math.sin( states.current.position ) )

    } )

    return (
        <mesh ref={ mesh }
              scale={ [ sWidth, sHeight, 1 ] }
              userData={ { index: index, link: link } }
        >
            <planeGeometry args={ [ 1, 1, 8, 8 ] }/>
            <ShaderMaterial image={ image }
                            size={ [ sWidth, sHeight ] }
            />
        </mesh>
    )
}

export default Image;


type Props = {
    image: any,
    index: number,
    projectCount: number,
    link: string,
    onAnimate: boolean
}
