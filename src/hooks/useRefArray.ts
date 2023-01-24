import { useRef } from "react";

const useRefArray = <T>() => {

    const refs   = useRef<T[]>( [] )
    refs.current = []

    const addToRefArray: ( el: T ) => void = ( el ) => {
        if ( el && !refs.current.includes( el ) ) {
            refs.current.push( el )
        }
    }

    return { refs, addToRefArray }
}

export default useRefArray;

