import React, { useRef } from "react";
import { Plane } from "@react-three/drei";
import { Mesh } from "three";

const WorkImage = (
    {
        image,
        link,
        index,
    }: Props
) => {


    const ref                  = useRef<Mesh>( null! )

    return (
        <Plane
            ref={ ref }
            // material={ material }
            // scale={ [ bounds.width, bounds.height, 1 ] }
        />
    )
}

export default WorkImage;


type Props = {
    image: any,
    link: string,
    index: number
}
