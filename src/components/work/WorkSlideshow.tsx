import React from "react";
import styled from "styled-components";

import WorkSlide from "@components/work/WorkSlide";

const WorkSlideshowStyle = styled.div`
  position: relative;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 8.5rem 0 7.5rem;
  align-items: center;
`;

const WorkSlideshow = (
    {
        project
    }: Props
) => {

    return (
        <WorkSlideshowStyle >
            {
                project.images.map( ( image, index ) =>
                    <WorkSlide
                        key={ `work-image-${ index }` }
                        image={ image }
                        index={ index }
                        link={ project.link }
                    />
                )
            }
        </WorkSlideshowStyle >
    )
}

export default WorkSlideshow;


type Props = {
    project: {
        id: number,
        images: any[],
        link: string
    }
}
