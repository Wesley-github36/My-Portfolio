import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import Images from "@components/home/Images";

const Home = () => {

    const { gl } = useThree()

    useEffect( () => {
        gl.autoClear = false

    }, [] )

    return (
        <Images />
    )
}

export default Home;
