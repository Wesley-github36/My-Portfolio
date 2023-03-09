import React, { useRef, useEffect, useState, SetStateAction, Dispatch } from "react";
import { Group }                                                        from "three";
import { gsap } from "gsap"

import ShaderMaterial       from "@components/ShaderMaterial";
import { useFlexSize, Box } from "@react-three/flex"
import DText                from "@components/other/DText";


const ArticleHeader = (
    {
        image,
        title,
		setHeader
    }: Props
) => {

    const splitText         = title.split( "-" )
    const [ width ] = useFlexSize()
    const ref = useRef<Group>( null! )
    const mesh = useRef( null! )


    let sWidth  = width
    let sHeight = 0.55 * width

	const yShift = 0.04 * width

	useEffect(() => {

		if ( ref.current && width ) setHeader( true )

	}, [ width ])
	
	useEffect(() => {
		gsap.to( mesh.current.material.uniforms.uAlpha, {
			value: 1,
			duration: 0.6,
			ease: "expo.easeIn",
			delay: 0.4
		} )
		
		gsap.from(mesh.current.position, {
			z: -30,
			duration: 0.6,
			ease: "expo.easeIn",
			delay: 0.3
		})
		
	}, [])

    return (
        <Box
			ref={ ref }
            marginTop={ 0.3 }
            width={ width }
            alignItems="center"

        >
            <Box centerAnchor width={ width }>
                <DText
                    text={ splitText[0] }
                />
            </Box>

             <Box centerAnchor width={ width }>
                        <mesh scale={ [ sWidth, sHeight, 1 ] } ref={mesh}>
                            <planeGeometry args={ [ 1, 1, 8, 8 ] }/>
                            <ShaderMaterial
                                image={ image }
                                size={ [ sWidth, sHeight ] }
                            />
                        </mesh>
                        <DText
                            text={ splitText[1] }
                            position={ [ 0, sHeight / 2 - yShift , 0 ] }
                        />
             </Box>

        </Box>
    )
}

export default ArticleHeader;


type Props = {
    image: any,
    title: string,
    setHeader: Dispatch<SetStateAction<boolean>>
}
