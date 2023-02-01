import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { lerp } from "@util/index";

let timeout: NodeJS.Timeout | undefined | number;
let fired = false

const useScroll = ( callback?: ( isScrolling: boolean ) => void ) => {

    const states = useRef( {
        position   : 0,
        speed      : 0,
    } )

    useEffect( () => {

        if ( callback && !fired ) callback( false )

        const onScroll = ( e: WheelEvent | TouchEvent ) => {
            if ( e instanceof WheelEvent )
                states.current.speed = -e.deltaY * 0.0025
            else
                states.current.speed = e.changedTouches[ 0 ].clientY * 0.00025;

            if ( callback && !fired ) {
                callback( true )
                fired = true
            }

            clearInterval( timeout )
            timeout = setTimeout( () => {

                if ( callback ) callback( false )
                fired = false

            }, 1000 )
        }

        window.addEventListener( "wheel", onScroll )
        window.addEventListener( "touchmove", onScroll )

        return () => {
            window.removeEventListener( "wheel", onScroll )
            window.removeEventListener( "touchmove", onScroll )

            clearInterval( timeout )
            fired = false
        }

    }, [] )

    useFrame( () => {
        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;
    } )

    return states.current
}

export default useScroll

