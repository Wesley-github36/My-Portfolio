import { useEffect, useRef } from "react";
import { Vector3 } from "three";

import useLayout from "@hooks/useLayout";
import VirtualScroll from 'virtual-scroll'

const scroller = new VirtualScroll()

const useScroll = ( speedControl = 0.002 ) => {

    const states       = useRef( {
        position: 0,
        speed   : 0,
        vector  : new Vector3()
    } )
    const { isMobile } = useLayout()

    useEffect( () => {

        const onScroll = ( e: Event ) => {

            if ( e.originalEvent instanceof WheelEvent )
                states.current.speed = e.deltaY * speedControl
            else
                states.current.speed = -e.deltaY * speedControl;

            if ( isMobile ) states.current.vector.set( 0, states.current.vector.y + states.current.speed, 0 )
            else states.current.vector.set( states.current.vector.x + states.current.speed, 0, 0 )

        }


        scroller.on( onScroll )
        return () => { scroller.off( onScroll ) }

    }, [] )

    return states
}

export default useScroll

