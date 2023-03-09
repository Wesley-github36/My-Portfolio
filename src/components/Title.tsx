import React, {useRef, useState, useEffect} from "react";
import { Text } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { Box,  } from "@react-three/flex";


import fontFamily from "@res/font/AbrilFatface-Regular.ttf"
import Color from "@theme/Color"
import {store, lerp, lerpPos} from "@util/index"
import useScroll from "@hooks/useScroll";

const margin = 0.16


const Title = (
    {
        text,
        font = fontFamily,
		color = Color.colorPrimary,
		index,
		length
    }: Props,
) => {

	const { viewport } = useThree()
	const states       = useScroll();
	 
	const ref = useRef<Group>(null!)
	//text = text.replace(" ", "\n\t\t\t\t\t\t\t\t")
	const [state, setState] = useState(false);
	
	useEffect(() => {
		let timeout;
		
		timeout = setTimeout(() => {
			setState( true )
			
			console.log("timeout")
		}, 1000)
		
		return () => clearTimeout( timeout )
		
	}, [state])
	
	useFrame( () => {

        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;

        const absZ    = Math.abs( ref.current.position.z )

        ref.current.position.y = lerpPos( length, index, margin, states.current.position )

    } )

    return (
		<Text
				ref={ref}
				font={ font }
				fontSize={ viewport.width / 7 }
				material-color={ color }
				lineHeight={1}
			>
				{ "" }
		</Text >
    )
}

export default Title;

type Props = {
    text: string,
    font?: any | undefined,
	color?: string | undefined,
	index: number,
	length: number
}
