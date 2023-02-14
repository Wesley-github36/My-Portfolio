import { useThree } from "@react-three/fiber";

const useLayout = () => {

    const { viewport } = useThree( );

    // const wRatio = width / window.innerWidth;  // units / px
    // const hRatio = height / window.innerHeight;

    // const mobileW = 1023 * wRatio;

    const mobilePercentageWidth = 1023 / screen.width;
    const mobileWithIn3Units = mobilePercentageWidth * viewport.width;

    if ( viewport.width <= mobileWithIn3Units )
        return {
            isMobile: true,
            // hRatio  : hRatio,
            // wRatio: wRatio
        }

    return {
        isMobile: false,
        // hRatio: hRatio,
        // wRatio: wRatio
    }
}

export default useLayout;
