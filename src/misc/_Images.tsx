import React, { useEffect, useRef } from "react";

import _Image from "./_Image";
import { Group, Mesh, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useScroll from "@hooks/useScroll";
import useLayout from "@hooks/useLayout";

const _Images = (
    {
        link
    }: Props
) => {

    const ref          = useRef<Group>( null! )
    const { viewport } = useThree( state => state )
    const scroll       = useScroll( 0.25 );
    const { isMobile } = useLayout()

    const elementsArray = [ ...document.querySelectorAll( `[ data-case-link=${ link } ]` ) ];

    useFrame( () => {

        const lastMesh = ref.current.children[ ref.current.children.length - 1 ] as Mesh;

        if ( isMobile ) {
            const posY = Math.abs( lastMesh.position.y )

            if ( isMobile && ref.current.position.y < 0 )
                scroll.current.vector.set( 0, 1, 0 )

            if ( isMobile && ref.current.position.y > posY - 0.15 * window.innerHeight )
                scroll.current.vector.set( 0, posY - ( 0.15 * window.innerHeight + 1 ), 0 )
        }

        ref.current.position.lerp( scroll.current.vector, 0.1 )

    } )


    return (
        <group ref={ ref } >
            {
                elementsArray.map( ( element, index, array ) => (
                    <_Image
                        key={ `work-image-${ index }` }
                        element={ element }
                        prevElement={ null }
                        index={ index }
                    />
                ) )
            }
        </group >
    )
}

export default _Images;


type Props = {
    link: string
}
