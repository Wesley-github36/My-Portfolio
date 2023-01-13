import React, { useEffect, useRef } from "react";
import { Mesh, Vector2 } from "three";
import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import useTile from "@hooks/useTile";
import useScroll from "@hooks/useScroll";
import { getBounds, resetPos, store } from "@util/index";

const cols      = 8,
      rows      = 8,
      margin    = 1000,
      amplitude = 0.25

let output;

const Image = (
    {
        image,
        index,
        length
    }: ImageProps
) => {

    const ref                           = useRef<Mesh>( null! )
    const { material, bounds, imgSize } = useTile( image )
    const states                        = useScroll();
    const { camera }                    = useThree()

    useEffect( () => {

        const onResize = () => {

            //Recalculate bounds on every resize
            const imageItem         = document.querySelector( ".js-slide" )
            const { width, height } = getBounds( imageItem! );

            material.uniforms.uImageSize.value = imgSize
            material.uniforms.uScale.value     = Math.max( width, height )
                / Math.hypot( width, height )
            material.uniforms.uMeshSize.value  = new Vector2( width, height )

            ref.current.scale.set(
                bounds.width,
                bounds.height,
                1
            )
        }

        window.addEventListener( "resize", onResize )
        return () => window.removeEventListener( "resize", onResize )

    }, [] )

    useFrame( () => {

        const absZ    = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, 50 ) / 50;

        if ( 0 <= absZ && absZ < 1 )
            output = Math.ceil( absZ )
        else if ( 1 <= absZ && absZ < 2 )
            output = Math.floor( absZ )
        else output = undefined

        if ( output ) store.index = index
        if ( material ) material.opacity = 1 - opacity

        ref.current.position.z = resetPos( length, index, margin, states.position )
        ref.current.rotation.z = 0 - ( amplitude * Math.sin( states.position ) )

    } )

    return (
        <Plane
            ref={ ref }
            material={ material }
            scale={ [ bounds.width, bounds.height, 1 ] }
            args={ [ 1, 1, cols, rows ] }
            onClick={ () => console.log( "Image: " + index + "   |  position: " + ref.current.position.z ) }
        />
    )
}

export default Image;


type ImageProps = {
    image: any,
    index: number,
    length: number,
}
