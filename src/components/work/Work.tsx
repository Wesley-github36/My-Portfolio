import React from "react";

import ProjectDetails from "@data/ProjectDetails";
import { useParams } from "react-router-dom";

import NotFound from "@components/notfound/NotFound";
import WorkImages from "@components/work/WorkImages";

const Work = () => {

    const { workTitle } = useParams()
    const project       = ProjectDetails.find( p => p.link === workTitle )

    if ( !project ) return ( <NotFound /> )

    return (

        <group >
            <WorkImages project={ project } />
        </group >
    )
}

export default Work;


/*
 * Utils and helpers
 */






