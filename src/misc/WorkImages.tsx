import React, { useEffect, useRef } from "react";
import { Group, MathUtils, Vector3 } from "three";
import useScroll from "@hooks/useScroll";
import { Plane } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import WorkImage from "./WorkImage";
import { getBoundingRect } from "@util/index";


const WorkImages = (
    {
        project
    }: Props
) => {

    const ref        = useRef<Group>( null! )
    const { height } = useThree( state => state.viewport )
    const scroll     = useScroll( 0.25 );

    const rect = getBoundingRect(
        `[data-case-link=${ project.link }]`,
        ".js-work-image"
    )


    useFrame( () => {

        if ( ref.current.position.y < 0 )
            scroll.current.vector.y = 1

        if ( ref.current.position.y > height - rect[ 0 ].gap * 2 )
            scroll.current.vector.y = height - rect[ 0 ].gap * 2 - 1

        ref.current.position.lerp( scroll.current.vector, 0.1 )
    } )

    return (
        <group
            ref={ ref }
        >
            {
                rect.map( ( entry, index ) => (
                    <WorkImage
                        key={ `work-image-${ index }` }
                        element={ entry.imageElement }
                        index={ index }
                        width={ entry.width }
                        height={ entry.height }
                        gap={ entry.gap }
                    />
                ) )
            }

        </group >
    )
}

export default WorkImages;


type Props = {
    project: {
        id: number,
        images: any[],
        link: string
    }
}

