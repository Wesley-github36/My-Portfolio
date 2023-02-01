import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

import font from "@res/font/AbrilFatface-Regular.ttf"
import Color from "@theme/Color"
import useScroll from "@hooks/useScroll";
import { useFrame, useThree } from "@react-three/fiber";
import { resetPos, store } from "@util/index";
import useRefArray from "@hooks/useRefArray";
import TitleText from "@components/TitleText";


const HomeTitle = (
    {
        index,
        length,
        title
    }: TitleProps
) => {

    const states = useScroll();

    return (
        <TitleText
            title={ title }
            scrollable
            states={ states }
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
