import useScroll from '@hooks/useScroll';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, useFlexSize, useReflow } from '@react-three/flex';
import React, { useEffect, useRef } from 'react'
import { Mesh } from 'three';
import { lerp, lerpPos } from '@util/index';

import Text from './Text';
import { margin as fmargin } from './values';
import useLayout from '@hooks/useLayout';

const Title = (props: Props) => {

    const { index, length, text } = props
    const ref = useRef<Mesh>(null!)
    const { viewport } = useThree()
    const [width] = useFlexSize()
    const states = useScroll()
    const { isTabletL } = useLayout()
    const _fmargin = fmargin(width)
    const reflow = useReflow()

    const margin = isTabletL ? Math.min(0.135 * width, _fmargin.text.mobile)
        : Math.min(0.07 * width, _fmargin.text.desktop)

    useEffect(() => {

        if ( ref.current ) {

            const boundingX = ref.current.geometry.boundingBox?.max.x;

            if (boundingX && boundingX !== -Infinity) {
                const start = width / 4;
                const x = start - boundingX;

                ref.current.position.x = -x;
            }
        }

    }, [width, ref.current])

    useFrame(() => {

        const { start, speed } = lerp(states.current.position, states.current.speed)
        states.current.position = start;
        states.current.speed = speed;

        

        ref.current.position.y = lerpPos(length, index, margin, states.current.position)
    })



    return (
        <Text
            bold
            ref={ref}
            text={text.toUpperCase()}
            textAlign="left"
            letterSpacing={-0.05}
            color="#ff3a00"
            lineHeight={1}
            maxWidth={viewport.width}
            reflow={reflow}
        />
    )
}

export default Title;


type Props = {
    index: number,
    length: number,
    text: string
}