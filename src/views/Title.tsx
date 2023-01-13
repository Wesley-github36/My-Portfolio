import React, { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { Text } from "@react-three/drei"

import Color from "@theme/Color"
import font from "@res/font/Mono.otf"
import { resetPos, store } from "@util/index";
import { useFrame, useThree } from "@react-three/fiber";

const Title = (
    {
        text = "Dan. J. Wills",
        index,
        length,
        back,
        states
    }: TitleProps
) => {

    const ref = useRef<Mesh>( null! )
    const [ values ] = useState( {
        marginBottom: 0.55,
        fontSize: 0.6
    } );
    const { width } = useThree( state => state.viewport )

    useFrame( () => {
        ref.current.position.y = resetPos( length, index, values.marginBottom, states.position )

        if ( !back )
            ref.current.visible = ( index % 6 ) === ( store.index % 6 ) &&
                Math.abs(ref.current.position.y) < 1;
    } )

    return (
        <Text
            ref={ ref }
            name="text"
            material-toneMapped={ false }
            material-color={ Color.colorPrimary }
            anchorX="left"
            maxWidth={5}
            font={ font }
            // position={ [ -width / 6, 0, 0 ] }
            fontSize={ values.fontSize }
			onClick={ back ? null : () => console.log(`title-${index}`) }
        >
            { text.toUpperCase() }
        </Text >
    )
}

export default Title;

//types
type TitleProps = {
    number: number,
    text: string,
    index: number,
    length: number,
    back?: boolean,
    states: {
        position: number,
        speed: number
    }
}

