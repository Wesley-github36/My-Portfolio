import { useEffect, useRef, useState } from "react";

const useBounds = ( selector: string ) => {
    const [ element, setElement ] = useState<Element | null>();
    const bounds                  = useRef( {
        width : 0,
        height: 0
    } )

    useEffect( () => {
        const el = document.querySelector( selector )

        if ( el ) {
            const getBounds = el.getBoundingClientRect();
            bounds.current  = {
                width : getBounds.width,
                height: getBounds.height
            }

            setElement( el )
        }

    }, [ element ] )
    useEffect( () => {

        const onResize = () => {
            if ( element ) {
                const getBounds = element.getBoundingClientRect();
                bounds.current  = {
                    width : getBounds.width,
                    height: getBounds.height
                }
            }
        }

        window.addEventListener( "resize", onResize )
        return () => window.removeEventListener( "resize", onResize )

    }, [] )

    return bounds.current
}


export default useBounds;

