import React from "react";
import { Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import useLayout from "@hooks/useLayout";
import Image from "./@Image"


const Images = ( { link }: { link: string } ) => {

    const { isMobile } = useLayout()
    const { viewport } = useThree( ( state ) => state )


    const article      = document.querySelector( `[data-id=${ link }]` ) as Element;
    const articleItems = [ ...article.querySelectorAll( '.case__gallery__media' ) ] as Element[];
    const mapItems = articleItems.map( ( element ) => {
        const imgEl             = element.querySelector( "img" ) as HTMLImageElement;
        const padding           = parseInt( window.getComputedStyle( element )
                                                  .getPropertyValue( isMobile ? "margin-top" : "margin-left" )
                                                  .slice( 0, -2 ) )
        const { height, width } = imgEl.getBoundingClientRect()

        return {
            width  : width,
            height : height,
            src    : imgEl.src,
            padding: padding
        }

    } )

    const sums     = isMobile ? mapItems.reduce( ( sum, { width, height } ) =>  sum + height, 0 )
        : mapItems.reduce( ( sum, { width, height } ) => sum + width, 0 )
    const pages    = isMobile ? sums / viewport.height : sums / viewport.width


    return (
        <ScrollControls
            horizontal={ !isMobile }
            damping={ 4 }
            pages={ pages }
        >
            <Scroll >
                <group >
                    {
                        mapItems.map( ( item, index ) => (
                            <Image
                                key={ `work-image-${ index }` }
                                padding={ item.padding }
                                image={ item.src }
                                width={ item.width }
                                height={ item.height }
                                index={ index }
                            />
                        ) )
                    }
                </group >
            </Scroll >

        </ScrollControls >
    )
}

export default Images;
