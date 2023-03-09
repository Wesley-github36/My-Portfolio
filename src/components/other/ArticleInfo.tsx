import React, { useEffect, useRef, useState }               from "react";
import { useFlexSize, Box } from "@react-three/flex"
import { useThree } from "@react-three/fiber"
import { Html }             from "@react-three/drei"

import font                                from "@res/font/neue-montreal-regular.otf"
import DText from "@components/other/DText"
import ArticleInfoText     from "@components/other/ArticleInfoText";
import {PixelsToUnits} from "@util/index"
 
const rootSize = ( 2.6666666667 / 100 ) * window.innerWidth;

const ArticleInfo = (
    {
        tech,
        url,
		setInfo
    }: Props
) => {

    const [ width ] = useFlexSize()
	const [ reflow, setReflow ] = useState( false )
	const ref = useRef( null! )
	
	const [ fontSize_1, fontSize_1_6, fontSize_3, mTop, padding ] 
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
		setInfo( true )
		
		
		let timeout = setTimeout(() => { 
			setReflow( true )

		}, 1000)
		
		return () => clearTimeout(timeout)
		
	}, [ reflow ])
	
	useEffect(() => {
		
		setReflow( false )
		
	}, [ width ])
		
	
	
    return (
        <>
			<ArticleInfoText 
				title={ "description".toUpperCase() }
				description={"Just very good desgined app, You get what I \nmean, no?"}
			/>
			
			<ArticleInfoText 
				title={ "Technologies".toUpperCase() }
				description={"JavaScipt, CSS, HTML\n"}
				marginTop={ 0.035 * width }
			/>
			
			<ArticleInfoText 
				title={ "Case".toUpperCase() }
				description={"View\n"}
				marginTop={ 0.035 * width }
				marginBottom={ 0.1 * width }
			/>
            
        </>
    )
}

export default ArticleInfo;


type Props = {
    tech: string[],
    url: string,
    link: string
}
