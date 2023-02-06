import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";


import font from "@res/font/AbrilFatface-Regular.ttf";
import Color from "@theme/Color";
import useRefArray from "@hooks/useRefArray";
import { lerpPos } from "@util/index";

const margin = 1000;
const defaultStates = {
    position: 0,
    speed: 0
}

const TitleText = (
    {
        title,
        index,
        length,
        states = defaultStates,
        scrollable
    }: Props
) => {

    const { refs: textRefs, addToRefArray } = useRefArray<Mesh>()
    const { width }                         = useThree( ( state ) => state.viewport )
    const yShift                            = useRef( {
        max: new Vector3()
    } )

    const splitText = title.split( " " );

    useEffect( () => {
        yShift.current.max = textRefs.current[ 0 ].geometry.boundingBox!.max;
        textRefs.current.forEach( ( ref, index ) => {
            const xShift   = 0.15 * width;
            ref.position.x = index % 2 === 0 ? -xShift : xShift;
        } )

    }, [] )
    useFrame( () => {

        if ( scrollable ) {
            const absZ    = Math.abs( textRefs.current[ 0 ].position.z )
            const opacity = Math.min( absZ, margin ) / margin;

            //@ts-ignore
            textRefs.current[ 0 ].material.opacity = 1 - opacity
            //@ts-ignore
            textRefs.current[ 1 ].material.opacity = 1 - opacity

            textRefs.current[ 0 ].position.z = lerpPos( length, index, margin, states.position )
            textRefs.current[ 1 ].position.z = lerpPos( length, index, margin, states.position )
        }
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

export default TitleText;


type Props = {
    index: number,
    length: number,
    title: string,
    scrollable: boolean,
    states: {
        position: number,
        speed: number
    }
}
