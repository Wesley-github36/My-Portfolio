import { Expo, gsap } from "gsap";
import { Object3D } from "three";

export const lerp = ( start: number, speed: number ) => {
    start += speed;
    speed *= 0.8;

    const rounded = Math.round( start );
    const diff = rounded - start;

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
    index: -1
}


export const getBounds = ( el: Element ) => {

    const bounds = el.getBoundingClientRect()

    return {
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left
    }
}

export const getScaleFactor = ( width: number ) =>
    width < 1024 ? { widthFactor: 0.007, heightFactor: 0.011 } : { widthFactor: 0.005, heightFactor: 0.005 }

export const getFov = ( p: number ) => ( 180 * ( 2 * Math.atan( window.innerHeight / 2 / p ) ) ) / Math.PI

export const cameraAngle = Math.PI / 6
