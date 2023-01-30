import React from "react";

import ProjectDetails from "@data/ProjectDetails";
import { Html } from "@react-three/drei";
import { useParams } from "react-router-dom";

import NotFound from "@components/notfound/NotFound";

const Work = () => {

    const { workTitle } = useParams()
    const project       = ProjectDetails.find( p => p.link === workTitle )

    if ( !project ) return ( <NotFound /> )

    return (
        <Html
            center
            style={{
                position  : "fixed",
                width     : "100vw",
                height    : "100vh",
                left      : 0,
                top       : 0,
                background: "#123"
            }}
        >
        </Html>
    )
}

export default Work;


/*
 * Utils and helpers
 */






