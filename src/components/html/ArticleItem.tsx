import React from "react";
import styled from "styled-components";

const ArticleItemStyle = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  background: #bebeb9;
  height: 100%;
  width: 100%;
  margin-left: 100px;


  @media (max-width: 1111px) {
    display: flex;
    margin-top: 2rem;
    margin-left: auto;
  }
  
  img {
    width: auto;
    height: 60vh;
    margin: 0 auto;

    @media (max-width: 1111px) {
      width: 90%;
      height: auto;
    }
  }

`;

const ArticleItem = (
    {
        image
    }: {
        image: any
    }
) => {
    return (
        <ArticleItemStyle
            className="case__gallery__media case__gallery__media--center"
            data-src={ image }
            data-height="880"
            data-width="1440"
        >
            <img src={ image } alt="" />
        </ArticleItemStyle >
    )
}

export default ArticleItem;
