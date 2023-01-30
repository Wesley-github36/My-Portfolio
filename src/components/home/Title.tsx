import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

import font from "@res/font/AbrilFatface-Regular.ttf"
import Color from "@theme/Color"
import useScroll from "@hooks/useScroll";
import { useFrame, useThree } from "@react-three/fiber";
import { resetPos } from "@util/index";
import useRefArray from "@hooks/useRefArray";


const margin = 1000;


const Title = (
    {
        index,
        length,
        title
    }: TitleProps
) => {


    const { refs: textRefs, addToRefArray } = useRefArray<Mesh>()
    const { width }                         = useThree( ( state ) => state.viewport )
    const yShift                            = useRef( {
        max: new Vector3()
    } )
    const states                            = useScroll( );

    const splitText = title.split( " " );

    useEffect( () => {
        yShift.current.max = textRefs.current[ 0 ].geometry.boundingBox!.max;
        textRefs.current.forEach( ( ref, index ) => {
            const xShift   = 0.15 * width;
            ref.position.x = index % 2 === 0 ? -xShift : xShift;
        } )

    }, [] )
    useFrame( () => {

        const absZ    = Math.abs( textRefs.current[ 0 ].position.z )
        const opacity = Math.min( absZ, margin ) / margin;

        //@ts-ignore
        textRefs.current[ 0 ].material.opacity = 1 - opacity
        //@ts-ignore
        textRefs.current[ 1 ].material.opacity = 1 - opacity

        textRefs.current[ 0 ].position.z = resetPos( length, index, margin, states.position )
        textRefs.current[ 1 ].position.z = resetPos( length, index, margin, states.position )
        textRefs.current[ 1 ].position.y = 0 - ( yShift.current.max.y + 3 )
    } )


    return (
        <group >
            {
                splitText.map( ( text, index ) =>
                    <Text
                        key={ "title-" + index }
                        ref={ addToRefArray }
                        font={ font }
                        color={ Color.colorPrimary }
                        fontSize={ 50 }
                        material-transparent
                        position={ [ 0, 0, 1 ] }
                    >
                        { text.toUpperCase() }
                    </Text >
                )
            }
        </group >
    )
}

export default Title;


type TitleProps = {
    index: number,
    length: number,
    title: string,
    link: string
}
