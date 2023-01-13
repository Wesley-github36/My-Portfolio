import React, { useRef, useState } from "react";
import { Plane } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { DoubleSide, Mesh, MeshLambertMaterial, Texture, TextureLoader } from "three";

import { resetPos, store } from "@util/index";
import useScroll from "@hooks/useScroll";

let output;
const imageAspect = 1440 / 880


const Image = (
    {
        image,
        index,
        length,
    }: ImageProps
) => {

    const ref = useRef<Mesh>( null! )
    const texture: Texture | any = useLoader( TextureLoader, image )
    const [ material, setMaterial ] = useState<MeshLambertMaterial>( null! )
    const [ size ] = useState( 5.5 )


    const states = useScroll()

    useFrame( () => {

        const absZ = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, 50 ) / 50;

        if ( 0 <= absZ && absZ < 1 )
            output = Math.ceil( absZ )
        else if ( 1 <= absZ && absZ < 2 )
            output = Math.floor( absZ )
        else output = undefined

        if ( output ) store.index = index
        if ( material ) material.opacity = 1 - opacity;

        ref.current.position.z = resetPos( length, index, 50, states.position ) + 0.1
        ref.current.rotation.z = -Math.PI / 12 + 0.4 * Math.sin( states.position )

    } )


    return (
        <>
            <meshLambertMaterial
                //@ts-ignore
                ref={ setMaterial }
                map={ texture }
                side={ DoubleSide }
                transparent={ true }
            />

            <Plane
                ref={ ref }
                args={[size * imageAspect, size]}
                material={ material }
                onClick={ () => console.log( "Image: " + index ) }
            />
        </>
    )
}

export default Image;

//type
type ImageProps = {
    image: any,
    index: number,
    length: number,
}
