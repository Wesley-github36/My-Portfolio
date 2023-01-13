import { useEffect } from "react";

const useScroll = ( values: { position: number, speed: number } ) => {
    const handleScroll = ( event: WheelEvent ) => values.speed = -event.deltaY

    useEffect( () => {

        window.addEventListener( "wheel", handleScroll )

        return () => { window.removeEventListener( "wheel", handleScroll ) }

    }, [] )

    return values;
}


export default useScroll
