import React, { useRef } from "react";
import { Mesh }          from "three";
import { useFlexSize }   from "@react-three/flex";
import { useFrame, useThree }      from "@react-three/fiber";

import { PixelsToUnits, lerp, lerpPos, store } from "@util/index";
import useScroll                                     from "@hooks/useScroll";
import Transformations                               from "@data/Transformations";
import DText                                         from "@components/other/DText";
import useLayout                                     from "@hooks/useLayout";
import font from "@res/font/Mono.otf"

const Title = (
    {
        text,
        index,
        projectCount,
        overlay,
		width
    }: Props
) => {

    const ref           = useRef<Mesh>( null! )
    const states        = useScroll( 0.005 )
    const { isTabletL } = useLayout()
	
    const [ mMarginPx, dMarginPx ] = PixelsToUnits( [ 64, 88 ], width )
    const margin                   = isTabletL ? Math.min( 0.135 * width, mMarginPx )
                                               : Math.min( 0.07 * width, dMarginPx )

    let translateX = isTabletL ? 0 : Transformations[ index ] * width
    translateX     = isNaN( translateX ) ? 0 : translateX

    useFrame( () => {

        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;

        ref.current.position.y = lerpPos( projectCount, index, margin, states.current.position )
    } )

    return (
        <DText
            ref={ ref }
            position={ [ 0, 0, 0 ] }
            text={ text.toUpperCase() }
			material-color={"#ff3a00"}
			font={font}
			textAlign="right"
        />
    )
}

export default Title;

type Props = {
    text: string,
    index: number,
    projectCount: number,
    overlay?: boolean | undefined,
}
