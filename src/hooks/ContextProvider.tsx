import React, { createContext, useContext, useState } from "react";

type ContextProviderProps = {
    children: React.ReactNode
}
type ContextValueProps = {
    index: {
        get: number,
        set: React.Dispatch<React.SetStateAction<number>>
    },
    activePage: {
        get: string,
        set: React.Dispatch<React.SetStateAction<string>>
    },
}

const Context = createContext<ContextValueProps>( {} as ContextValueProps );

export const useActivePageAndIndex = () => useContext( Context )

const ContextProvider = ( { children }: ContextProviderProps ) => {
    const [ index, setIndex ]           = useState( -1 )
    const [ activePage, setActivePage ] = useState( "" );

    return (
        <Context.Provider
            value={ {
                index     : { get: index, set: setIndex },
                activePage: { get: activePage, set: setActivePage }
            } }
        >
            { children }
        </Context.Provider >
    )
}

export default ContextProvider
