import React from "react";
import styled from "styled-components";

import ProjectDetails from "@data/ProjectDetails";
import Article from "@components/html/Article";

const ArticleStyle = styled.div`
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  position: fixed;
  opacity: 0;
  overflow: scroll;
  pointer-events: all;
  z-index: -2;
`;

const Articles = () => {

    return (
        <ArticleStyle className="cases" >
            {
                ProjectDetails.map( ( p, index ) => (
                    <Article
                        key={ `article-${ index }` }
                        id={ p.link }
                        images={ p.images }
                    />
                ) )
            }
        </ArticleStyle >
    )
}

export default Articles;
