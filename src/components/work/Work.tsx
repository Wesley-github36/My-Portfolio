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
        <Html >
            { workTitle }
        </Html >
    )
}

export default Work;


/*
 * Utils and helpers
 */






