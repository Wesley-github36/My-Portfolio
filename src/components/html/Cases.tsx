import React from "react";
import styled from "styled-components";

import ProjectDetails from "@data/ProjectDetails";
import CaseItem from "@components/html/CaseItem";

const CasesStyle = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  user-focus: none;
  overflow: hidden;
  opacity: 0;
  
  .case-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

`;

const Cases = () => {

    return (
        <CasesStyle >
            <div className="case-wrapper" >
                {
                    ProjectDetails.map( ( { link, images }, index ) => (
                        <CaseItem
                            key={ `case-gallery-${ index }` }
                            images={ images }
                            link={ link }
                        />
                    ) )
                }
            </div >
        </CasesStyle >
    )
}

export default Cases;
