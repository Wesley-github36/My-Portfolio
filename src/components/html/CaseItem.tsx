import React, { useEffect } from "react";
import styled from "styled-components";

import CaseItemGallery from "@components/html/CaseItemGallery";

const CaseItemStyle = styled.ul`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12vh 0;
  align-items: center;
  
  @media ( width > 1111px ) {
    flex-direction: row;
    padding: 0 10vw;
  }
  
`;

const CaseItem = (
    {
        images,
        link
    }: Props
) => {

    return (
        <CaseItemStyle >
            {
                images.map( ( image, index ) => (
                    <CaseItemGallery
                        key={ `galley-item-${ index }` }
                        image={ image }
                        index={ index }
                        link={ link }
                    />
                ) )
            }
        </CaseItemStyle >
    )
}

export default CaseItem;

type Props = {
    images: any[],
    link: string
}
