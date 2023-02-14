import React from "react";

import Image from "@components/work/Image";
import { Plane } from "@react-three/drei";
import { Box } from "@react-three/flex";

const Images = (
    {
        images,
        width,
        height,
        heights
    }: Props
) => {

    return (
        <>
            { images.map( ( image, index ) => (
                    <Image
                        key={ `image-${ index }` }
                        image={ image }
                        width={ width }
                        height={ height }
                        index={ index }
                        desktopHeight={ heights[ index ] }
                    />
                )
            ) }
        </>
    )
}

export default Images;


type Props = {
    images: any[],
    width: number,
    height: number,
    heights: number[]
}
