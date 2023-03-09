import React, { useRef } from "react";
import { Box } from "@react-three/flex";
import { Mesh } from "three";
import { useThree } from "@react-three/fiber";


import useLayout from "@hooks/useLayout";
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
                >
                    <planeGeometry args={ [ 1, 1, 8, 8 ] } />
                    <ShaderMaterial
                        image={ image }
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
