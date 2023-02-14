import React from "react";
import { useParams } from "react-router-dom";
import { useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";

import useLayout from "@hooks/useLayout";
import ProjectDetails from "@data/ProjectDetails";
import NotFound from "@components/notfound/NotFound";
import Images from "@components/work/Images";


const Work = () => {

    const { workLink } = useParams()
    const project      = ProjectDetails.find( p => p.link === workLink )

    if ( !project ) return ( <NotFound /> )

    const { viewport } = useThree()
    const { isMobile } = useLayout()

    const dir = isMobile ? "column" : "row";

    return (
        <group >
            <Flex
                dir={ dir }
                position={ [ -viewport.width / 2, viewport.height / 2, 0 ] }
                size={ [ viewport.width, viewport.height, 0 ] }
            >
                <Box
                    dir={ dir }
                    width={ isMobile ? "100%" : "auto" }
                    height={ isMobile ? "auto" : "100%" }
                    marginTop={ isMobile ? 0.3 : 0 }
                    alignItems={ "center" }
                    justifyContent={ "center" }
                >
                    { ( width, height ) => (
                        <Images
                            images={ project.images }
                            height={ height }
                            width={ width }
                            heights={ project.heights }
                        />
                    ) }
                </Box >

            </Flex >

        </group >
    );
}

export default Work;






