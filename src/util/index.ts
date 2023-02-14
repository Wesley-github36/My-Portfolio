export const lerp = ( start: number, speed: number ) => {
    start += speed;
    speed *= 0.8;

    const rounded = Math.round( start );
    const diff    = rounded - start;

    start += Math.sign( diff ) * Math.pow( Math.abs( diff ), 0.7 ) * 0.015;

    return { speed, start }
}

export const lerpPos = (
    length: number,
    index: number,
    margin: number,
    position: number,
    infinite = true
) => {
    if ( infinite )
        return ( margin * ( length - index + position ) + ( 1000000 ) )
            % ( length * margin ) - length / 2 * margin

    return margin * ( index + position )
}

/**
 * Converts a width of DOM into
 * THREE units
 * @param DOMWidth [number]
 * @param THREEViewportWidth [number]
 *
 */
export const DOMWidth2THREEUnits = ( DOMWidth: number, THREEViewportWidth: number ) => {
    const percent = DOMWidth / screen.width;
    return percent * THREEViewportWidth
}

/**
 * Converts a width of DOM into
 * THREE units
 * @param DOMHeight [number]
 * @param THREEViewportHeight [number]
 *
 */
export const DOMHeight2THREEUnits = ( DOMHeight: number, THREEViewportHeight: number ) => {
    const percent = DOMHeight / screen.height;
    return percent * THREEViewportHeight
}


export const getBoundingRect = (
    querySelectorParent: string,
    querySelectorChildren: string
) => {
    const parentArray = [ ...document.querySelectorAll( querySelectorParent ) ] as Element[];

    return parentArray.map( ( element ) => {
        const image             = element.querySelector( querySelectorChildren ) as HTMLImageElement
        const paddingBottom     = parseInt( window.getComputedStyle( element )
                                                  .getPropertyValue( "padding-bottom" )
                                                  .slice( 0, -2 ) );
        const { width, height } = image.getBoundingClientRect();

        return {
            imageElement: image,
            gap         : paddingBottom,
            width       : width,
            height      : height
        }
    } );
}


export const camera = {
    perspective: 2,
    near       : 0.1,
    far        : 1000,
    angle      : Math.PI / 9,
    fov        : function () {
        return ( 180 * ( 2 * Math.atan( window.innerHeight / 2 / this.perspective ) ) ) / Math.PI
    }
}
