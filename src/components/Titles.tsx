import React, { useRef } from "react"
import { Scene } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";

import Title from "@components/Title";
import Projects from "@data/Projects";


const Titles = () => {

    const scene = useRef<Scene>( null! )
	const { viewport } = useThree()

	const projects = [...Projects, ...Projects, 
		...Projects, ...Projects ]

    useFrame( ( { gl, camera } ) => {

        gl.clearDepth()
        gl.render( scene.current, camera )

    }, 2 )

    return (
        <scene ref={ scene } >
            <Flex
				dir={"column"}
				position={ [ -viewport.width / 2, viewport.height / 2, 0 ] }
                size={ [ viewport.width, viewport.height, 0 ] }
			>
				<Box
                    dir={ "column" }
                    width={ "100%" }
                    height={ "100%" }
					alignItems={ "flex-start" }
                    justifyContent={ "flex-start" }
					centerAnchor
				>
				{
					projects.map( ( { title }, index ) => (
						<Title
							key={ `title-${ index }` }
							text={ title }
							index={ index }
							length={projects.length}
						/>
					) )
				}
				
				</Box>
			
			</Flex>
        </scene >
    )

}

export default Titles;
