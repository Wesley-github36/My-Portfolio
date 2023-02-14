import React, { useRef } from "react";
import { Box } from "@react-three/flex";
import { Mesh } from "three";
import { useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";


import useLayout from "@hooks/useLayout";
import { DOMWidth2THREEUnits } from "@util/index";
import ShaderMaterial from "@components/ShaderMaterial";


const Image = (
    {
        image,
        width,
        height,
        index,
        desktopHeight
    }: Props
) => {
    const ref          = useRef<Mesh>( null! )
    const { viewport } = useThree()
    const { isMobile } = useLayout()

    const doScale = () => {

        if ( isMobile ) {
            const meshWidth  = 0.9 * width;
            const meshHeight = 0.7 * width

            return [ meshWidth, meshHeight, 1 ]
        }

        return [ ( 1.75 * desktopHeight ) * viewport.height, desktopHeight * viewport.height, 1 ]
    }
    const scale   = doScale()

    const px100to3Units = DOMWidth2THREEUnits( 100, viewport.width )

    let mLeft;
    if ( isMobile )
        mLeft = 0
    else if ( index === 0 )
        mLeft = 0
    else
        mLeft = px100to3Units

    return (
        <Box
            marginTop={ isMobile ? 0.1 : 0 }
            marginLeft={ mLeft }
            height={ isMobile ? "auto" : "60%" }
            justifyContent={ isMobile ? "center" : "flex-start" }
        >
            <Box centerAnchor >
                <mesh
                    ref={ ref }
                    // @ts-ignore
                    scale={ scale }
                > }
                    <planeGeometry args={ [ 1, 1, 8, 8 ] } />
                    <ShaderMaterial
                        image={ image }
                        size={ scale.slice( 0, -1 ) }
                    />
                </mesh >
            </Box >

        </Box >
    )
}

export default Image;


type Props = {
    image: any,
    width: number,
    height: number,
    index: number,
    desktopHeight: number
}
