import { useEffect, useState } from "react";

export const lerp = ( start: number, speed: number ) => {
    start += speed;
    speed *= 0.8;

    const rounded = Math.round( start );
    const diff    = rounded - start;

    start += Math.sign( diff ) * Math.pow( Math.abs( diff ), 0.7 ) * 0.015;

    return { speed, start }
}

export const resetPos = (
    length: number,
    index: number,
    margin: number,
    position: number
) => (
    margin * ( length - index + position ) + ( 1000000 )
) % ( length * margin ) - length / 2 * margin


export const store = {
    link: ""
}


export const getFov = ( p: number ) => ( 180 * ( 2 * Math.atan( window.innerHeight / 2 / p ) ) ) / Math.PI

export const camera = {
    perspective: 800,
    near       : 1,
    far        : 2000,
    angle      : Math.PI / 6,
    fov        : function () {
        return getFov( this.perspective )
    }
}
