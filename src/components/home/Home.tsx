import React, { useEffect } from "react";

import Images from "@components/home/Images";
import Titles from "@components/home/Titles";
import { useThree } from "@react-three/fiber";


/*
 (-, +) | (+, +)
    ----|----
  (-,-) | (+, -)
 */

const Home = () => {

    const { mouse, scene } = useThree()


    useEffect( () => {
        console.log( "Home mounted..." )

        return () => console.log( "Home unmounted..." )
    } )


    return (
        <group onClick={() => console.log(mouse)}>
            <Images />
            <Titles />
        </group>
    )
}

export default Home;
