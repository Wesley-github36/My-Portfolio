import React from "react";

import useScroll from "@hooks/useScroll";
import TitleText from "@components/TitleText";
import { useFrame } from "@react-three/fiber";
import { lerp } from "@util/index";


const HomeTitle = (
    {
        index,
        length,
        title
    }: TitleProps
) => {

    const states = useScroll();

    useFrame(() => {
        const { start, speed }  = lerp( states.current.position, states.current.speed )
        states.current.position = start;
        states.current.speed    = speed;
    })

    return (
        <TitleText
            title={ title }
            scrollable
            states={ states.current }
            length={ length }
            index={ index }
        />
    )
}

export default HomeTitle;


type TitleProps = {
    index: number,
    length: number,
    title: string,
    link: string
}
