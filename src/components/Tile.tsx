import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { Group, Mesh, ShaderMaterial, Texture, Vector2 } from "three";
import { camera } from "@util/index";
import { Plane, useTexture } from "@react-three/drei";

const vertexShader   = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
      fragmentShader = `
    varying vec2 vUv;

    uniform sampler2D uTexture;
    uniform vec2 uMeshSize;
    uniform vec2 uImageSize;
    uniform float uScale;
    uniform float uAngle;
    uniform float uAlpha;

    vec2 scaleUV(vec2 uv, float scl) {
        float mid = 0.5;
        return vec2(
            uv.x * scl + mid,
            uv.y * scl + mid
        );
    }

    vec2 cover(vec2 sz, vec2 is, vec2 uv) {
      float screenRatio = sz.x / sz.y;
      float imageRatio = is.x / is.y;

      vec2 newSize = screenRatio < imageRatio
          ? vec2(is.x * sz.y / is.y, sz.y)
          : vec2(sz.x, is.y * sz.x / is.x);

      vec2 newOffset = (screenRatio < imageRatio
          ? vec2((newSize.x - sz.x) / 2.0, 0.0)
          : vec2(0.0, (newSize.y - sz.y) / 2.0)) / newSize;

      return uv * sz / newSize + newOffset;
    }

    vec2 rotateUV(vec2 uv, float rotation) {
        float mid = 0.5;
        return vec2(
            cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
            cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }

    void main() {

        vec2 uv = vUv;
        // uv = scaleUV(uv, 0.6);
        uv -= 0.5;
        uv *= uScale;
        uv += 0.5;
        uv = cover(uMeshSize, uImageSize, uv);

        vec2 texUv = rotateUV(uv, -uAngle);
        vec4 img = texture2D(uTexture, texUv);
        gl_FragColor = vec4(img.rgb, uAlpha);
}
`;


const Tile = forwardRef( (
    {
        image,
        onClick,
        element,
        width,
        height,
        position
    }: Props,
    ref: ForwardedRef<Group>
) => {

    const mesh               = useRef<Mesh>( null! )
    const [ shaderMaterial ] = useState( new ShaderMaterial() )
    const texture            = useTexture( image ) as Texture

    return (
        <group
            ref={ ref }
            //@ts-ignore
            position={ position ?? [ 0, 0, 0 ] }
        >
            <Plane
                ref={ mesh }
                args={ [ 1, 1, 8, 8 ] }
                onClick={ onClick }
                scale={ [ width, height, 1 ] }
                material={ shaderMaterial }
                material-uniforms={ {
                    uTime     : { value: 0 },
                    uAlpha    : { value: 1 },
                    uTexture  : { value: 0 },
                    uMeshSize : { value: new Vector2( 0, 0 ) },
                    uImageSize: { value: new Vector2( 0, 0 ) },
                    uScale    : { value: 1 },
                    uVelo     : { value: 0 },
                    uAngle    : { value: camera.angle }
                } }
                material-vertexShader={ vertexShader }
                material-fragmentShader={ fragmentShader }
                material-transparent
                material-uniforms-uTexture-value={ texture }
                material-uniforms-uImageSize-value={ [ texture.image.naturalWidth, texture.image.naturalHeight ] }
                material-uniforms-uScale-value={ Math.max( width, height ) / Math.hypot( width, height )}
                material-uniforms-uMeshSize-value = {[ width, height ]}
            />
        </group >
    )
} )

export default Tile;


type Props = {
    image: any,
    onClick?: () => void | null,
    element: HTMLImageElement,
    position?: number[] | undefined,
    width: number,
    height: number
}
