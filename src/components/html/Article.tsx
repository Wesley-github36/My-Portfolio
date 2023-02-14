import React from "react";
import styled from "styled-components";

import ArticleItem from "@components/html/ArticleItem";

const ArticleStyle = styled.article`
  height: 100%;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 0;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;

  .case__gallery {
    align-items: center;
    display: flex;
    font-size: 0;
    height: 100%;
    left: 0;
    padding: 0 8rem;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;

    @media (max-width: 1111px) {
      display: block;
      height: auto;
      padding: 8.5rem 0 7.5rem;
      top: 0;
      transform: none;
      width: 100%
    }
  }

  .case__gallery__wrapper {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    overflow: hidden;

    @media (max-width: 1023px) {
      display: block;
      white-space: normal
    }
  }


`;

const Article = (
    {
        id,
        images
    }: {
        id: string,
        images: any[]
    }
) => {

    return (
        <ArticleStyle
            className="case"
            data-background="#c2c7cc"
            data-id={ id }
        >
            <div className="case__gallery" >
                <div className="case__gallery__wrapper" >
                    {
                        images.map( ( image, index ) => (
                            <ArticleItem
                                key={ `article-item-${ index }` }
                                image={ image }
                            />
                        ) )
                    }
                </div >
            </div >

        </ArticleStyle >
    )
}

export default Article;
