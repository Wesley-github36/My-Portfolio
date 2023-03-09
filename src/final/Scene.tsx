import React, { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { WaterPass } from 'three-stdlib'

import Home             from "./Home";
import { camera }       from "@util/index";
import { sRGBEncoding, Color } from "three";

extend({ WaterPass })

const Loader = () => {

    return (
        <Html center style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
			display: "grid",
			placeItems: "center"
        }}>
            <div className="pulse"/>
        </Html>
    )
}

const Scene = ( { page }: SceneProps ) => {

    return (
        <Canvas
            dpr={[1, 5]}
            camera={ {
                position: [ 0, 0, camera.perspective ],
                near    : camera.near,
                far     : camera.far,
            } }
            gl={ {
                antialias: true,
                alpha    : true,
                powerPreference: "high-performance",
                stencil: true,
                depth: false
            } }
            onCreated={ ( { gl } ) => {
                gl.setPixelRatio( devicePixelRatio )
                gl.physicallyCorrectLights = true
                gl.outputEncoding = sRGBEncoding
                // gl.setClearColor( new Color("#f4d8cc") )
            } }
        >
            <color attach="background" args={[ new Color("#f4d8cc") ]} />
			<Suspense fallback={ <Loader /> }>
				{ page === 1 && <Home /> }
			
			</Suspense>

        </Canvas >
    )
}

export default Scene;

type SceneProps = {
    page?: number
}




