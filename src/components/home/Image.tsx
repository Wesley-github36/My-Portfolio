import React, { useEffect, useRef } from "react";
import { Mesh, Vector2 } from "three";
import { Plane } from "@react-three/drei";

import useTile from "@hooks/useTile";
import { getBounds, getScaleFactor } from "@util/index";

const cols = 8,
      rows = 8

const Image = (
    {
        image,
        index,
        length
    }: ImageProps
) => {

    const ref                           = useRef<Mesh>( null! )
    const { material, bounds, imgSize } = useTile( image )

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

    return (
        <Plane
            ref={ ref }
            material={ material }
            scale={ [ bounds.width, bounds.height, 1 ] }
            args={ [ 1, 1, cols, rows ] }
            onClick={ () => console.log( "Image: " + index ) }
        />
    )
}

export default Image;


type ImageProps = {
    image: any,
    index: number,
    length: number,
}
