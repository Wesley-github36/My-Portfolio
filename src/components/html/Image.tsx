import React from "react";
import styled from "styled-components";

const ImageStyle = styled.li`
  position: absolute;
  display: grid;
  place-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: rotate(-15deg);

  .img-item {
    height: 70vh;
    width: 70vw;

    @media ( width > 1024px ) {
      height: 85vh;
      width: 65vw;
      max-height: 700px;
      max-width: 1200px;
    }

  }
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Image = (
    {
        image,
        index
    }: ImageProps
) => {
    return (
        <ImageStyle >
            <div className="img-item" >
                <img
                    src={ image }
                    alt={ `Project ${ index } - Avatar` }
                />
            </div >
        </ImageStyle >
    )
}

export default Image;


type ImageProps = {
    image: any,
    index: number
}
