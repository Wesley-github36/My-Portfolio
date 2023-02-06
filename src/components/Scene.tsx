import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Home from "@components/home/Home";
import About from "@components/about/About";
import NotFound from "@components/notfound/NotFound";
import Work from "@components/work/Work";
import { camera } from "@util/index";
import Color from "@theme/Color";
import { Preload } from "@react-three/drei";

const Scene = ( { page }: SceneProps ) => {

    return (
        <Canvas
            camera={ {
                position: [ 0, 0, camera.perspective ],
                fov     : camera.fov(),
                near    : camera.near,
                far     : camera.far
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
            <Suspense fallback={ null} >
                { page === 1 && <Home /> }
                { page === 2 && <About /> }
                { page === 3 && <Work /> }
                { !page && <NotFound /> }

                <Preload />
            </Suspense >
        </Canvas >
    )
}

export default Scene;

type SceneProps = {
    page?: number
}
