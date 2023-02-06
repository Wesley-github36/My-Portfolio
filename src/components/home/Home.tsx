import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

import HomeImages from "@components/home/HomeImages";
import HomeTitles from "@components/home/HomeTitles";


const Home = () => {

    const { gl } = useThree()

    useEffect( () => { gl.autoClear = false }, [] )

    return (
        <group >
            <HomeImages />
            <HomeTitles />
        </group >

    )
}

export default Home;
