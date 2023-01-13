import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import MainDisplay from "./MainDisplay"

const Home = () => {
    const { gl } = useThree()

    useEffect( () => { gl.autoClear = false }, [] )

    return ( <MainDisplay /> )
}

export default Home;


export type Props = {
    states: {
        position: number,
        speed: number
    }
}
