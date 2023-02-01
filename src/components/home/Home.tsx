import React, { useEffect } from "react";

import HomeImages from "@components/home/HomeImages";
import HomeTitles from "@components/home/HomeTitles";
import { useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import HomeSlideshow from "@components/home/HomeSlideshow";


const Home = () => {

    const { gl } = useThree()

    useEffect( () => { gl.autoClear = false }, [] )

    return (
        <>
            <Html
                center
                style={ {
                    position     : "fixed",
                    width        : "100vw",
                    height       : "100vh",
                    left         : 0,
                    top          : 0,
                    opacity      : 0,
                    pointerEvents: "none",
                    userSelect   : "none"
                } }
            >
                <HomeSlideshow />
            </Html >

            <group >
                <HomeImages />
                <HomeTitles />
            </group >
        </>
    )
}

export default Home;
