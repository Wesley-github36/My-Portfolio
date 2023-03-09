import { ReactNode, useRef, useEffect }   from "react";
import { Box, BoxProps, Flex, FlexProps } from "@react-three/flex";
import { useFrame, useThree }  from "@react-three/fiber";
import { Scene, Color }               from "three";


const FlexScene = ( props: Props ) => {

    const { children, renderPriority, headUpDisplay, ...restProps } = props
    const priority = renderPriority ?? 0;

    const { viewport }                 = useThree()
    const scene                        = useRef<Scene>( null! )

    useFrame( ( { gl, camera } ) => {

        if ( headUpDisplay )
            gl.clearDepth()

        gl.render( scene.current, camera )

    }, priority )

    return (
        <scene
			ref={ scene }
		>
			<color attach="background" args={["#123456"]} />
            <Flex position={ [ -viewport.width / 2, viewport.height / 2, 0 ] }
                  size={ [ viewport.width, viewport.height, 0 ] }
				  { ...restProps }
            >
				{ children }
            </Flex>
        </scene>
    )
}

export default FlexScene;


// const isCallback = ( maybeFunction: ReactNode | ( ( width: number, height: number ) => ReactNode ) ):
//     maybeFunction is ( ( width: number, height: number ) => ReactNode ) => typeof maybeFunction === 'function'


interface Props extends FlexProps {
    headUpDisplay?: boolean | undefined,
    renderPriority?: number | undefined,
}


