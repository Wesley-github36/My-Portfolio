import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";

import Home from "@components/home/Home";
import About from "@components/about/About";
import NotFound from "@components/notfound/NotFound";
import Work from "@components/work/Work";
import { camera } from "@util/index";

const Loaded = () => {

    return (
        <Html center >
            <span style={{ color: "#000000" }}>...Loading...</span>
        </Html>
    )
}
const Scene = ( { page }: SceneProps ) => {

    return (
        <Canvas
            camera={ {
                position: [ 0, 0, camera.perspective ],
                near    : camera.near,
                far     : camera.far,
            } }
            gl={ {
                antialias: true,
                alpha    : true,
                powerPreference: "high-performance"
            } }
            onCreated={ ( { gl } ) => gl.setPixelRatio( devicePixelRatio ) }
        >
            <Suspense fallback={ <Loaded /> } >
                { page === 1 && <Home /> }
                { page === 2 && <About /> }
                { page === 3 && <Work /> }
                { !page && <NotFound /> }
                <Preload all />
            </Suspense >
        </Canvas >
    )
}

export default Scene;

type SceneProps = {
    page?: number
}
