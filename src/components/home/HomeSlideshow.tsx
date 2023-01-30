import React from "react";
import styled from "styled-components";

import Projects from "@data/Projects";
import HomeSlide from "@components/home/HomeSlide";

const HomeSlideshowStyle = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 12vh 0;
  user-select: none;
  pointer-events: none;
  opacity: 0;

  @media ( width < 768px ) {
    padding: 15vh 15vw;
  }

  @media ( width >= 768px ) and ( height > 568px ) {
    max-height: 768px;
    padding: 9vh 0;
  }

  .slideshow-inner {
    width: 100%;
    max-width: 568px;
    position: relative;

    @media ( width > 1111px ) {
      width: 80vw;
      max-width: 768px;
    }
  }
  
`;

const HomeSlideshow = () => {
    return (
        <HomeSlideshowStyle >
            <ul className="slideshow-inner | js-slideshow" >
                {
                    Projects.map( ( { avatar, title }, index ) =>
                        <HomeSlide
                            key={ index }
                            avatar={ avatar }
                            index={ index }
                            title={ title }
                        />
                    )
                }
            </ul >
        </HomeSlideshowStyle >
    )
}

export default HomeSlideshow;