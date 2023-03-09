import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef, ReactNode } from "react";
import { Text }                                                                 from "@react-three/drei"
import { useThree }                                                             from "@react-three/fiber"
import { Mesh }                                                                 from "three";
import { useFlexSize, useReflow }                                                          from "@react-three/flex";
import { PixelsToUnits }                                                  from "@util/index";
import font                                                                     from "@res/font/ampersand.ttf"
import useLayout                                                                from "@hooks/useLayout";


const DText = forwardRef( ( props: Props, ref: ForwardedRef<Mesh> ) => {

    const { text, ...restProps } = props
    const { viewport }           = useThree()
    const { isTabletS }          = useLayout()
    const [ mFontSizePx, dFontSizePx ] = PixelsToUnits( [ 80, 110 ], viewport.width )

    const fontSize = isTabletS
                     ? Math.min( 0.15 * viewport.width, mFontSizePx )
                     : Math.min( 0.085 * viewport.width, dFontSizePx )

    return (
        <Text
            ref={ ref }
            font={ font }
            fontSize={ fontSize }
            material-toneMapped
            material-fog
            material-transparent
            { ...restProps }
        >
            { text }
        </Text>
    )
} )


export default DText;

type Props = Omit<ComponentPropsWithoutRef<typeof Text>, "children"> & {
    text: string
}


