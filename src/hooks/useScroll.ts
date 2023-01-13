import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { lerp } from "@util/index";

const useScroll = () => {

    const states = useRef( {
        position: 0,
        speed: 0
    } )

    useEffect( () => {

        const onScroll = ( e: WheelEvent | TouchEvent ) => {

            if ( e instanceof WheelEvent )
                states.current.speed = -e.deltaY * 0.0025
            else
                states.current.speed = e.changedTouches[ 0 ].clientY * 0.00025;
        }

        window.addEventListener( "wheel", onScroll )
        window.addEventListener( "touchmove", onScroll )

        return () => {
            window.removeEventListener( "wheel", onScroll )
            window.removeEventListener( "touchmove", onScroll )
        }

    }, [] )

    useFrame( () => {
        const { start, speed } = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed = speed;
    } )

    return states.current
}

export default useScroll

