import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useThree } from "@react-three/fiber";

import useLayout from "@hooks/useLayout";
import ProjectDetails from "@data/ProjectDetails";
import NotFound from "@components/notfound/NotFound";
import { Scene } from "three";


const Work = () => {

    const { workLink } = useParams()
    const project      = ProjectDetails.find( p => p.link === workLink )

    if ( !project ) return ( <NotFound /> )

    const { viewport } = useThree()
    const { isMobile } = useLayout()
    const scene = useRef<Scene>(null!)

    const dir = isMobile ? "column" : "row";



    return (
        <scene ref={scene}>

        </scene >
    );
}

export default Work;






