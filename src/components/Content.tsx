import React from "react";
import styled from "styled-components";

import Scene from "@components/Scene";

const ContentStyle = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #dedede;
  //background: red;
`;

const Content = (
    {
        page
    }: Props
) => {
    return (
        <ContentStyle >
            {/*<Slideshow />*/ }
            {/*<Articles />*/ }
            <Scene page={ page } />
        </ContentStyle >
    )
}


type Props = {
    page?: number | undefined
}

export default Content;
