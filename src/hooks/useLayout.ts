import { useThree }            from "@react-three/fiber";
import { PixelsToUnits } from "@util/index";

const useLayout = () => {

    const { viewport } = useThree();

    const [ mobBreakPoint, tabSmallBreakpoint, tabBigBreakpoint ]
              = PixelsToUnits( [ 568, 812, 1111 ], viewport.width )

    if ( viewport.width <= mobBreakPoint )
        return { isMobile: true }

    if ( viewport.width <= tabSmallBreakpoint )
        return { isTabletS: true }

    if ( viewport.width <= tabBigBreakpoint )
        return { isTabletL: true }

    return { isDesktop: true }
}

export default useLayout;
