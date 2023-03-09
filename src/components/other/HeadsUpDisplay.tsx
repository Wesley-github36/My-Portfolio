import React         from "react";

import Projects  from "@data/Projects";
import Title     from "@components/other/Title"
import FlexScene from "@/final/FlexScene";

const projects = [
    ...Projects, ...Projects, ...Projects
    , ...Projects, ...Projects
]

const HeadsUpDisplay = () => {

    return (
        <FlexScene
            renderPriority={ 2 }
            headUpDisplay
        >
            { ( ( width, height ) => (
                    projects.map( ( project, index ) => (
                        <Title
								key={`title-${index}`}
                                flexSize={ [ width, height ] }
                                text={ project.title }
                                index={ index }
                                projectCount={ projects.length }
                                headsUpDisplay
								margin={1}
                        />
                    ) )
                )
            ) }
        </FlexScene>
    )
}

export default HeadsUpDisplay;

