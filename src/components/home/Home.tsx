import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import Images from "@components/home/Images";
import Titles from "@components/Titles";
import Stripe from "@components/Stripe";
import BackgroundEffect from "@components/postprocessing/BackgroundEffect";

const Home = () => {

    const { gl, scene, camera } = useThree()

    useEffect( () => {
        gl.autoClear = false

    }, [] )


    return (
        <>
            <BackgroundEffect />
            <Images />
            {/*<Items />*/}
        </>
    )
}

export default Home;
