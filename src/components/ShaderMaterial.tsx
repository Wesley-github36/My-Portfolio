import React, { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Vector2, ShaderMaterial as TShaderMaterial, Texture } from "three";

import { camera } from "@util/index";

const vertexShader   = `

    varying vec2 vUv;
    uniform float uTime;
    varying vec3 vPosition;


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
    uniform float uTime;
    

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

let time = 0

const ShaderMaterial = (
    {
        image,
        size,
    }: Props
) => {

    const texture  = useTexture( image ) as Texture
    const ref      = useRef<TShaderMaterial>( null! )
	const uniforms = useRef<UniformsProps>( {
                                uTime     : { value: 0 },
                                uAlpha    : { value: 0 },
                                uTexture  : { value: 0 },
                                uMeshSize : { value: new Vector2( 0, 0 ) },
                                uImageSize: { value: new Vector2( 0, 0 ) },
                                uScale    : { value: 1 },
                                uVelo     : { value: 0 },
                                uAngle    : { value: 0 }
    })

    uniforms.current.uTexture.value   = texture;
    uniforms.current.uImageSize.value = [ texture.image.naturalWidth, texture.image.naturalHeight ]
    uniforms.current.uScale.value     = Math.max( ...size ) / Math.hypot( ...size )
    uniforms.current.uMeshSize.value  = size

    return (
        <shaderMaterial
            ref={ ref }
            uniforms={ uniforms.current }
            vertexShader={ vertexShader }
            fragmentShader={ fragmentShader }
            transparent
        />
    )
}

export default ShaderMaterial;


type Props = {
    image: string,
    size: number[],
}
type UniformsProps = {
    uTime: { value: number },
    uAlpha: { value: number },
    uTexture: { value: number | Texture },
    uMeshSize: { value: Vector2 | number[] },
    uImageSize: { value: Vector2 | number[] },
    uScale: { value: number },
    uVelo: { value: number },
    uAngle: { value: number }
}
