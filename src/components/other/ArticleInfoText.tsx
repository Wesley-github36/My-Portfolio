import React, { useEffect, useRef } from "react";
import { Box, useFlexSize } from "@react-three/flex";
import { gsap } from "gsap";
import { useThree } from "@react-three/fiber";

import DText from "@components/other/DText"
import font from "@res/font/neue-montreal-regular.otf"
import {PixelsToUnits} from "@util/index"



const rootSize = ( 2.66666666 / 100 ) * window.innerWidth;


const ArticleInfoText = (
	{
		title,
		description,
		marginTop,
		marginBottom
	}
) => {	
	const [ width ] = useFlexSize()
	const ref1 = useRef()
	const ref2 = useRef()

	const [ fontSize_1, fontSize_1_6, fontSize_3, mTop ] 
		= PixelsToUnits( [ 
			rootSize, 1.6 * rootSize, 
			3 * rootSize, 
			2 * rootSize,
			4 * rootSize
		] , width )
	const [ breakpoint ] = PixelsToUnits(812, width)
	
	const fontSize = width < breakpoint 
		? fontSize_1_6 : fontSize_3
		
	useEffect(() => {
		
		gsap.from([ ref1.current.material, ref2.current.material ], {
			duration: 0.8,
			opacity: 0,
			delay: 1.2
		})
				
	}, [])
			
	
    return (
        <Box
			centerAnchor 
			width={ 0.9 * width }
			marginTop={ marginTop }
			marginBottom={ marginBottom }
			alingItems="flex-start"
			justifyContent="flex-start"
			align="left"
			justify="left"
		>
			<DText
					ref={ref1}
					text={ title }
					font={ font }
					fontSize={ fontSize_1 }
			/>
			<DText
					ref={ref2}
					position={[0, -0.065 * width, 0]}
					text={ description }
					font={ font }
					fontSize={ fontSize }
			/>
		</Box>
    )
}

export default ArticleInfoText;
