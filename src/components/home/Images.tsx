import React from "react";
import { Box, Flex } from "@react-three/flex";
import { useThree } from "@react-three/fiber";

import Projects from "@data/Projects";
import Image from "@components/home/Image";


const Images = () => {

    const { viewport } = useThree()

    return (
        <Flex
            position={ [ -viewport.width / 2, viewport.height / 2, 0 ] }
            size={ [ viewport.width, viewport.height, 0 ] }
        >
            <Box
                dir={ "column" }
                width={ "100%" }
                height={ "100%" }
                centerAnchor
            >
                { ( width, height ) => (
                    Projects.map( ( project, index ) => (
                        <Image
                            key={ `image-${ index }` }
                            image={ project.avatar }
                            link={ project.link }
                            width={ width }
                            height={ height }
                            index={ index }
                            length={ Projects.length }
                        />
                    ) )
                ) }
            </Box >
        </Flex >
    )
}

export default Images;
