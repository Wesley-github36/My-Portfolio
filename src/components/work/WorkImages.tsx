import React from "react";

import WorkImage from "@components/work/WorkImage";
import { useTexture } from "@react-three/drei";

const WorkImages = (
    {
        project
    }: Props
) => {

    return (
        <group >
            {
                project.images.map( ( image, index ) =>
                    <WorkImage
                        key={ `work-image-${ index }` }
                        image={ image }
                        link={ project.link }
                        index={ index }
                    />
                )
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

