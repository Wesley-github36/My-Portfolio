import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Html } from "@react-three/drei";

export const Fallback = ( { setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> } ) => {

    useEffect( () => { return () => setLoading( false ) } )

    return (
        <Html center>
            <span>hello</span>
        </Html>
    )
}

export default ( { loading }: { loading: boolean } ) => {

    const ref = useRef<HTMLDivElement>( null! )

    useEffect( () => {
        let timeout: NodeJS.Timeout | undefined;

        if ( !loading )
            timeout = setTimeout( () => {
                ref.current.style.top = "-100vh";
            }, 5000 )

        return () => clearTimeout( timeout )

    }, [ loading ] )

    return (
        <Html ref={ ref } style={ {
            position     : "fixed",
            left         : 0,
            top          : 0,
            height       : "100vh",
            width        : "100vw",
            background   : "#feddae",
            transition   : "top .3s",
            zIndex       : 9999999,
            pointerEvents: "none",
            userSelect   : "none"

        } } >
            <span >...LOADING...</span >
        </Html >
    )
}
