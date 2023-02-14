import React from "react";
import styled from "styled-components";

const HomeSlideStyle = styled.li`
  position: relative;
  margin-bottom: 15%;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  user-select: none;

  .wrapper {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    

    position: absolute;
    left: 0;
    top: 0;
  }

  .title {
    font-size: 11vw;
    font-weight: 900;
    line-height: .9;
    text-transform: uppercase;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

`;

const Slide = (
    {
        avatar,
        index,
        title,
        link
    }: SlideProps
) => {
    return (

        <HomeSlideStyle className="slide | js-slide" >
            <div className="wrapper" >
                <img
                    src={ avatar }
                    alt={ `project-avatar` }
                    className="js-slide-image"
                    data-slide-image-link={ link }
                />
                <h3 className="title | js-title" >{ title }</h3 >
            </div >
        </HomeSlideStyle >
    )
}

export default Slide;


type SlideProps = {
    avatar: any,
    index: number,
    title: string,
    link: string
}
