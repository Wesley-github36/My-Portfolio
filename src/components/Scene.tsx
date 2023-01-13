import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";

import Color from "@theme/Color";
import Home from "@components/home/Home";
import About from "@components/about/About";
import NotFound from "@components/notfound/NotFound";
import Slideshow from "@components/home/Slideshow";

import { cameraAngle, getFov } from "@util/index";

const perspective = 800,
      fov         = getFov( perspective ),
      near        = 1,
      far         = 2000;

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
        <>
            <Slideshow />
            <Canvas
                camera={ {
                    position: [ 0, 0, perspective ],
                    fov     : fov,
                    rotation: [ 0, 0, -cameraAngle ],
                    near    : near,
                    far     : far
                } }
                style={ {
                    position  : "fixed",
                    width     : "100%",
                    height    : "100%",
                    left      : 0,
                    top       : 0,
                    overflow  : "hidden",
                    background: Color.colorBackground
                } }
                gl={ {
                    antialias: true,
                    alpha    : true
                } }
            >
                <Suspense fallback={ <Loader /> } >
                    { page === 1 && <Home /> }
                    { page === 2 && <About /> }
                    { !page && <NotFound /> }
                </Suspense >
            </Canvas >
        </>
    )
}

export default Scene;

type SceneProps = {
    page?: number
}
