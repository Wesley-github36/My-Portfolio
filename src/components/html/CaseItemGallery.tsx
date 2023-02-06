import React from "react";
import styled from "styled-components";

const randomPercents = [
    {
        width : "50vh",
        height: "35vh"
    }, {
        width : "60vh",
        height: "45vh"
    }, {
        width : "70vh",
        height: "40vh"
    }, {
        width : "80vh",
        height: "45vh"
    }, {
        width : "90vh",
        height: "50vh"
    }, {
        width : "100vh",
        height: "65vh"
    }
]

const StyledCase: React.FC<StyledProps> = (
    {
        className = "",
        size,
        children,
        ...props

    }
) => {

    return (
        <li
            className={ className }
            { ...props }
        >
            { children }
        </li >
    )
}

const CaseItemGalleryStyle = styled( StyledCase )`
  width: 90%;
  height: 55vw;
  flex-shrink: 0;
  padding-bottom: 1.75rem;

  @media ( width > 1111px ) {
    width: ${ ( { size } ) => size.width };
    height: ${ ( { size } ) => size.height };
    padding-bottom: 0;
    padding-right: 3rem;
  }


  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const CaseItemGallery = (
    {
        image,
        index,
        link
    }: Props
) => {

    const randomIndex = Math.floor( Math.random() * randomPercents.length )
    const size        = randomPercents[ randomIndex ];

    return (
        <CaseItemGalleryStyle
            className="work-slide js-work-slide"
            size={ size }
            data-case-link={ link }
            data-case-index={ index }
        >
            <img
                src={ image }
                alt={ `work-image` }
                className="work-image | js-work-image"
            />

        </CaseItemGalleryStyle >
    )
}

export default CaseItemGallery;

type Props = {
    image: any,
    index: number,
    link: string,
}
type StyledProps = {
    size: { width: string, height: string },
    className: string,
    children: React.ReactNode,
    ["data-case-link"]: string,
    ["data-case-index"]: number
}


