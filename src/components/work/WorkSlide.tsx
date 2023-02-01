import React from "react";
import styled from "styled-components";

const WorkSlideStyle = styled.div`
  width: 90%;
  height: 55vw;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const WorkSlide = (
    {
        image,
        index,
        link
    }: Props
) => {

    return (
        <WorkSlideStyle
            className={ `work-slide | js-work-slide | js-work-${ link }-${ index }` }
            data-slide={ `work-slide-${ index }` }
        >
            <img
                src={ image }
                alt={ `work-image` }
                className="work-image | js-work-image"
            />
        </WorkSlideStyle >
    )
}

export default WorkSlide;


type Props = {
    image: any,
    index: number,
    link: string
}
