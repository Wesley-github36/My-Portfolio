import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";

import Color from "@theme/Color";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";

const Loader = () => {

    const progress = useProgress()

    return (
        <Html center >
            <span >{ progress.progress }</span >
        </Html >
    )
}

const Scene = ( { page }: SceneProps ) => {

    return (
        <Canvas
            camera={ {
                position: [ 0, 0, 5 ],
                fov: 70
            } }
            style={ {
                position: "fixed",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                background: Color.colorBackground
            } }
            gl={ { antialias: true, alpha: true } }
        >
            <Suspense fallback={ <Loader /> } >
                { page === 1 && <Home /> }
                { page === 2 && <About /> }
                { !page && <NotFound /> }
            </Suspense >
        </Canvas >
    )
}

export default Scene;

type SceneProps = {
    page?: number
}
