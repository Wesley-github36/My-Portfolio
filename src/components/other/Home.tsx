import React, { useEffect } from "react";
import { useThree }         from "@react-three/fiber";
import { Box }         from "@react-three/flex";

import FlexScene from "@/final/FlexScene";
import Titles    from "@components/other/Titles";
import Images    from "@components/other/Images";



const Home = () => {

    const { gl, scene } = useThree()

    useEffect( () => {
        gl.autoClear = false;

    }, [] )

    return (
        <>
            <FlexScene
                renderPriority={ 1 }
				color={ "#f4d8cc" }
				flexWrap="wrap"
            >
				<Box 
					dir="row"
                     width="100%"
                     height="auto"
					 align="left"
					 justify="left"
					 minHeight="100%"
                >
				{
					( (width, height) => (
						<Box centerAnchor>
							<Titles width={ width } />
						</Box>
					))
				}
                </Box>
            </FlexScene>

        </>
    )
}

export default Home;
