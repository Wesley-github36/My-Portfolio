import React, { useRef } from "react";
import Tile from "@components/Tile";
import { Group } from "three";
import { useThree } from "@react-three/fiber";

const WorkImage = (
    {
        element,
        index,
        width,
        height,
        gap
    }: Props
) => {


    const ref                 = useRef<Group>( null! )
    const { height: vHeight } = useThree( state => state.viewport )
    const posY                = ( vHeight / 2 - height ) - ( ( height + gap ) * index )

    return (
        <Tile
            ref={ ref }
            image={ element.src }
            element={ element }
            position={ [ 0, posY, 0 ] }
            height={ height }
            width={ width }
        />
    )
}

export default WorkImage;


type Props = {
    element: HTMLImageElement
    index: number,
    width: number,
    height: number,
    gap: number
}
