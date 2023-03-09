import { PixelsToUnits } from "@util/index";


export const margin = (measurement: number) => {
    const [mMarginPx, dMarginPx] = PixelsToUnits([64, 80], measurement);

    return {
        text: {
            mobile: mMarginPx,
            desktop: dMarginPx
        }
    }
}

export const fontSize = (measurement: number) => {
    const [ mFontSizePx, dFontSizePx ]
        = PixelsToUnits( [ 80, 80 ], measurement )

    return {
        mobile: mFontSizePx,
        desktop: dFontSizePx
    }

}

export const size = (measurement: number) => {

    const [mobMaxHeight, tabSMaxHeight, tabLMaxHeight, xDesMaxHeight]
        = PixelsToUnits([568, 360, 400, 550], measurement);
    const [mobMaxWidth, tabSMaxWidth, TabLMaxWidth, xDesMaxWidth]
        = PixelsToUnits([500, 360, 625, 868], measurement)


    return {
        image: {
            maxHeight: {
                mobile: mobMaxHeight,
                tabletS: tabSMaxHeight,
                tabletL: tabLMaxHeight,
                xDesMaxHeight: xDesMaxHeight
            },
            maxWidth: {
                mobile: mobMaxWidth,
                tabletS: tabSMaxWidth,
                tabletL: TabLMaxWidth,
                xDesMaxHeight: xDesMaxWidth
            }
        }
    }


}