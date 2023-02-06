import { useEffect, useRef } from "react";
import { Vector3 } from "three";


const useScroll = ( speedControl = 0.0025 ) => {

    const states = useRef( {
        position: 0,
        speed   : 0,
        vector: new Vector3()
    } )

    useEffect( () => {

        const onScroll = ( e: WheelEvent | TouchEvent ) => {
            if ( e instanceof WheelEvent )
                states.current.speed = -e.deltaY * speedControl
            else
                states.current.speed = e.changedTouches[ 0 ].clientY * speedControl / 10;

            states.current.vector.y += states.current.speed
        }

        window.addEventListener( "wheel", onScroll )
        window.addEventListener( "touchmove", onScroll )

        return () => {
            window.removeEventListener( "wheel", onScroll )
            window.removeEventListener( "touchmove", onScroll )
        }

    }, [] )

    return states
}

export default useScroll

