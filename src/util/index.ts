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
    perspective: 800,
    near       : 1,
    far        : 2000,
    angle      : Math.PI / 6,
    fov        : function () {
        return ( 180 * ( 2 * Math.atan( window.innerHeight / 2 / this.perspective ) ) ) / Math.PI
    }
}
