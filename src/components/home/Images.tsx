import React from "react";

import Projects from "@data/Projects";
import Image from "@components/home/Image";


const Images = () => {

    return (
        <group >
            { Projects.map( ( { avatar, title }, index ) => (
                <Image
                    key={ `image-${ index }` }
                    index={ index }
                    length={ Projects.length }
                    image={ avatar }
                />
            ) ) }
        </group >
    )
}

export default Images;
