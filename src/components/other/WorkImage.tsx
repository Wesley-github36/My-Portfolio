import React           from "react";
import WorkImage       from "@components/other/WorkImage";
import ShaderMaterial  from "@components/ShaderMaterial";
import { useFlexSize, Box } from "@react-three/flex";


const WorkArticle = ( props: Props ) => {
    const { image, index }         = props
    const [ width, height ] = useFlexSize()

    let sWidth, sHeight

    sWidth = 0.9 * width
    sHeight = 0.25 * height;
	
	if ( index === 0 ) {
		sWidth = width
		sHeight = 0.3 * height;

	}

    return (
        <Box centerAnchor marginTop={0.12}>
			<mesh scale={ [ sWidth, sHeight, 1 ] }>
				<planeGeometry args={ [ 1, 1, 8, 8 ] }/>
				<ShaderMaterial 
					image={ image } 
					size={ [ sWidth, sHeight ] }
				/>

			</mesh>
		</Box>
    )
}

export default WorkArticle;


type Props = {
    image: any,
	index: number
};
