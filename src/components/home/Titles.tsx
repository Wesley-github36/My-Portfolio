import React from "react";

import Projects from "@data/Projects";
import Title from "@components/home/Title";


const Titles = () => {
    return (
        <group >

            { Projects.map( ( { title, link }, index ) =>
                <Title
                    key={ "title-" + index }
                    index={ index }
                    length={ Projects.length }
                    title={ title }
                    link={ link }
                />
            ) }

        </group >
    )
}

export default Titles;
