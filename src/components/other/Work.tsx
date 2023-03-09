import React         from "react";
import { useParams } from "react-router-dom";
import { useThree }  from "@react-three/fiber";

import ProjectDetails          from "@data/ProjectDetails"
import useLayout               from "@hooks/useLayout"
import NotFound                from "@components/notfound/NotFound"
import FlexScene               from "@/final/FlexScene";
import WorkArticle             from "@components/other/WorkArticle";
import { PixelsToUnits } from "@util/index";


const Work = () => {

    const params       = useParams()
    const { viewport } = useThree()
    const project      = ProjectDetails.find( ( p => p.link === params.workLink ) )

    if ( !project ) return <NotFound/>


    return (
        <FlexScene
            dir={ "column" }
            alignItems="center"
            color={ "#3a5135" }
            height={ "auto" }
        >
            <WorkArticle project={ project }/>
        </FlexScene>
    )
}

export default Work;
