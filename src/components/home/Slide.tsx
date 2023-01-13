import React from "react";
import styled from "styled-components";

const SlideStyle = styled.li`
  overflow: hidden;
  position: absolute;
  margin-bottom: 15%;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;

    opacity: 1;
    user-select: none;
    pointer-events: none;
  }
`;

const Slide = (
    {
        avatar,
        index
    }: SlideProps
) => {
    return (
        <SlideStyle className="slide | js-slide" >
            <img
                src={ avatar }
                alt={ `project-avatar` }
            />
        </SlideStyle >
    )
}

export default Slide;


type SlideProps = {
    avatar: any,
    index: number
}
