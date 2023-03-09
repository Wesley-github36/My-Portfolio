import { useEffect, useRef } from "react";


const useResize = () => {

    const resize = useRef( false )

    useEffect( () => {

        let timeout: NodeJS.Timeout | number | undefined
        const onResize = () => {
            clearTimeout( timeout )
            resize.current = true;

            timeout = setTimeout( () => resize.current = false, 500 )
        }

        window.addEventListener( "resize", onResize )
        return () => {
            window.removeEventListener( "resize", onResize )
            clearTimeout( timeout )
        }

    }, [] )

    return resize

}


export default useResize;
