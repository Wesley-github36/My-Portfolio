import React, { useEffect, useState } from "react";
import { useFlexSize, Box } from "@react-three/flex"
import { gsap } from "gsap"

import ShaderMaterial from "@components/ShaderMaterial";
import useRefArray from "@hooks/useRefArray";


const ArticleGallery = (
    {
        images
    }
) => {

    const [ width ]     = useFlexSize()
	const [ rerender, setRerender ] = useState(true)
	const { refs, addToRefArray } = useRefArray()

		useEffect(() => {
						
			if ( refs ) {
				let uAlphas = [];
				let meshPosition = [];
				
				refs.current.forEach(group => {
					const mesh = group.children[0];
					
					uAlphas.push( mesh.material.uniforms.uAlpha )
				})
				
				
				if ( uAlphas ) 
					gsap.to( uAlphas, {
						value: 1,
						duration: 1,
						delay: 1.4,
						stagger: 0.2,
						ease: 'expo.easeIn'
					})
			}
			
			
		}, [ refs.current ])
	

    let sWidth  = 0.9 * width;
    let sHeight = 0.45 * width;

    const boxMarginTop = 0.1
	
	useEffect(() => {
		let timeout;
		
		const onResize = () => {
			setRerender( false )
			clearTimeout(timeout)
			
			timeout = setTimeout(() => setRerender(true), 250)
		}
		
		window.addEventListener("resize", onResize )
		return () => {
			window.removeEventListener("resize", onResize )
			clearTimeout(timeout)
		}
	}, [])
	
    return (
       rerender && (
			 images.map( ( image, index ) => (
                    <Box
						ref={ addToRefArray }
                        key={ `gallery-image-${ index }` }
						centerAnchor
                        marginTop={ index === 0 ? 0 : boxMarginTop }
                    >
                        <mesh scale={ [ sWidth, sHeight, 1 ] }
                        >
                            <planeGeometry args={ [ 1, 1, 8, 8 ] }/>
                            <ShaderMaterial
                                image={ image }
                                size={ [ sWidth, sHeight ] }
                            />
                        </mesh>

                    </Box>

        ) )
	   )
    )
}

export default ArticleGallery;


