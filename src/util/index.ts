import { createRef } from "react";
import { MathUtils } from "three";

export const lerp = (start: number, speed: number) => {
    start += speed;
    speed *= 0.8;

    const rounded = Math.round(start);
    const diff = rounded - start;

    start += Math.sign(diff) * Math.pow(Math.abs(diff), 0.7) * 0.015;

    return { speed, start }
}

export const lerpPos = (
    length: number,
    index: number,
    margin: number,
    position: number
) => {

    return (margin * (length - index + position) + (600000))
        % (length * margin) - length / 2 * margin
}

/**
 * Converts a pixel size into
 * THREE units along a
 * dimension
 *
 * @param size
 * @param threeWidth
 * @param dimension
 */

export const PixelsToUnits = (
    size: number[] | number,
    threeWidth: number,
    dimension?: "width" | "height" | undefined
) => {

    const viewport = dimension === "height" ? document.documentElement.clientHeight
        : document.documentElement.clientWidth

    if (typeof size === "number")
        return [size / viewport * threeWidth]


    return size.map((s, index) => s / viewport * threeWidth)

}


export const camera = {
    perspective: 2,
    near: 0.1,
    far: 1000,
    angle: Math.PI / 9,
    fov: function () {
        return (180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) / Math.PI
    }
}


export const store = {
    index: -1,
    midPos: NaN,
    animationComplete: false,
    imagePos: NaN,
    groupCenter: NaN
}


export const mergeIndexes = (index1: number, index2: number, length: number) => {
    const difference = Math.abs(index1 - index2)

    if (index2 === index1)
        return index1;

    // index2 = 29
    // index1 = 0
    if (index2 > index1)
        if (index2 + difference === length)
            return index1;


    //index2 < index1
}
