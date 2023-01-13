import React from "react";

import Projects from "@data/Projects";
import Title from "./Title";


const Titles = ({ states, back }: TitleProps ) => {
    return (
        <group>
            {
                Projects.map( ( { avatar, title }, index ) => (
                    <Title
                        key={`title-${index}`}
                        number={ index }
                        text={ title }
                        index={ index }
                        length={ Projects.length }
                        states={ states }
                        back={ back }
                    />
                ) )
            }
        </group >
    )
}

export default Titles;


//type
type TitleProps = {

    states: {
        speed: number,
        position: number
    },
    back?: boolean
}
