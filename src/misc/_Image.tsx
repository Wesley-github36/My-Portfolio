import React, { MutableRefObject, useRef } from "react";

import ShaderMaterial from "@components/ShaderMaterial";
import { Mesh } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useLayout from "@hooks/useLayout";

const cols = 8,
      rows = 8;

const _Image = (
    {
        element,
        index
    }: Props
) => {

    const ref          = useRef<Mesh>( null! )
    const { isMobile } = useLayout();

    const imageElement      = element.querySelector( ".js-work-image" ) as HTMLImageElement
    const { width, height } = imageElement.getBoundingClientRect();

    let pos;

    if ( isMobile ) {
        const gap  = parseInt( window.getComputedStyle( element )
                                     .getPropertyValue( "padding-bottom" )
                                     .slice( 0, -2 ) );
        const posY = ( window.innerHeight / 2 - height ) - ( ( height + gap ) * index )
        pos        = [ 0, posY, 0 ]
    }
    else {
        const gap  = parseInt( window.getComputedStyle( element )
                                     .getPropertyValue( "padding-left" )
                                     .slice( 0, -2 ) );
        const posX = width * index
        pos        = [ posX, 0, 0 ]
    }


    return (
        <mesh
            position={ [ ...pos ] }
            ref={ ref }
            scale={ [ width, height, 1 ] }
        >
            <planeGeometry args={ [ 1, 1, rows, cols ] } />
            <ShaderMaterial
                image={ imageElement.src }
                size={ [ width, height ] }
                imageNaturalSize={ [ imageElement.naturalWidth, imageElement.naturalHeight ] }
            />
        </mesh >
    )
}

export default _Image;


type Props = {
    element: Element,
    index: number

}
