import React from "react";
import styled from "styled-components";
import Projects from "@data/Projects";

import Image from "@components/html/Image";

const ImagesStyle = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  opacity: 1;
  pointer-events: none;
`;

const Images = () => {
    return (
        <ImagesStyle >
            {
                Projects.map( ( { avatar }, index ) =>
                    <Image
                        key={ `project-${ index }` }
                        image={ avatar }
                        index={ index }
                    />
                )
            }
        </ImagesStyle >
    )
}

export default Images;

