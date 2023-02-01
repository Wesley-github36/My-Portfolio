import React, { useEffect } from "react";

import ProjectDetails from "@data/ProjectDetails";
import { Html } from "@react-three/drei";
import { useParams } from "react-router-dom";

import NotFound from "@components/notfound/NotFound";
import WorkSlideshow from "@components/work/WorkSlideshow";
import WorkImages from "@components/work/WorkImages";
import { useThree } from "@react-three/fiber";

const Work = () => {

    const { workTitle } = useParams()
    const project       = ProjectDetails.find( p => p.link === workTitle )

    if ( !project ) return ( <NotFound /> )

    return (
        <>
            <Html
                center
                style={ {
                    position     : "fixed",
                    width        : "100vw",
                    height       : "100vh",
                    left         : 0,
                    top          : 0,
                    background   : "#112233",
                    opacity      : 0,
                    pointerEvents: "none",
                    userSelect   : "none"
                } }
            >
                <WorkSlideshow
                    project={ project }
                />
            </Html >

            <group >
                <WorkImages project={ project } />
            </group >

        </>
    )
}

export default Work;


/*
 * Utils and helpers
 */






