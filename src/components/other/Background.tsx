import React from "react";
import { Html } from "@react-three/drei";
import styled from "styled-components";

const HomeBackground = styled.div`
  background: #151C13;
  display: none;
  pointer-events: none;
  height: 100vh;
  width: 100vw;
  position: absolute;

  @media ( max-width : 812px ) {
    display : block;
  }

  .home__background__top, .home__background__bottom {
    background : #151C13;
    content    : "";
    display    : block;
    height     : 10rem;
    position   : absolute;
    width      : 100%;
  }

  .home__background__top {
    background : linear-gradient(to bottom, #151C13 0%, transparent 100%);
    top        : 0;
  }

  .home__background__bottom {
    background : linear-gradient(to bottom, transparent 0%, #151C13 100%);
    bottom     : 0;
  }
`;

const Background = () => {
    return (
        <Html fullscreen>
            <HomeBackground className="home__background" >
                <div className="home__background__top" ></div >
                <div className="home__background__bottom" ></div >
            </HomeBackground >
        </Html>
    )
}

export default Background;
