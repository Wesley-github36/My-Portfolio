import React, { ForwardedRef, forwardRef, ComponentPropsWithoutRef, useEffect, useRef } from 'react'
import { Mesh } from 'three';
import { Text as TextImpl } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import InterBold from './Inter-Bold.ttf';
import InterRegular from './Inter-Regular.ttf';
import useLayout from '@hooks/useLayout';
import { fontSize } from '@/final/values';
import { useReflow } from '@react-three/flex';

const Text = forwardRef((props: Props, ref?: ForwardedRef<Mesh>) => {

    const { viewport } = useThree()
    const { isTabletS } = useLayout()
    const fSize = fontSize(viewport.width)

    const _fontSize = isTabletS
                     ? Math.min( 0.15 * viewport.width, fSize.mobile )
                     : Math.min( 0.085 * viewport.width, fSize.desktop )

    const { text, bold, reflow, ...restProps } = props
    const font = bold ? InterBold : InterRegular

    return (

        <TextImpl
            ref={ref}
            font={font}
            fontSize={_fontSize}
            onSync={ reflow }
            {...restProps}
        >
            { text }
        </TextImpl>
    )

})

export default Text;


type Props = Omit<ComponentPropsWithoutRef<typeof TextImpl>, "children"> & {
    text: string,
    bold?: boolean | undefined,
    reflow?: () => void | undefined
}
