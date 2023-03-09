import { TMOBILE } from "./breakpoints";


const fontSize = ( viewportWidth: number ) => {

    const mobile = TMOBILE( viewportWidth )

    if ( mobile ) return ( 4 * 2.6666666667 ) * viewportWidth

    return ( 15 / 0.9 ) * 0.5208333333 * viewportWidth
}

