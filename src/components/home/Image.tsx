import React, { useEffect, useRef } from "react";
import { Mesh, ShaderMaterial, TextureLoader, Vector2 } from "three";
import { Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import useTile from "@hooks/useTile";
import useScroll from "@hooks/useScroll";
import { cameraAngle, getBounds, resetPos, store } from "@util/index";

const cols      = 8,
      rows      = 8,
      margin    = 1000,
      amplitude = 0.25

let output;

const vertexShader     = `
    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,
      fragmentShader   = `
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
`,
      loader           = new TextureLoader(),
      imageNaturalSize = [ 1024, 1024 ];

const Image = (
    {
        image,
        index,
        length
    }: ImageProps
) => {

    const ref    = useRef<Mesh>( null! )
    const tile   = useTile( image )
    const states = useScroll();

    // useEffect( () => {
    //
    //     const onResize = () => {
    //         const materialCloned = tile.material!.clone()
    //
    //         const imageItem         = document.querySelector( ".js-slide" );
    //         const { width, height } = getBounds( imageItem! );
    //
    //         materialCloned.uniforms.uMeshSize.value  = new Vector2( width, height )
    //         materialCloned.uniforms.uScale.value     = Math.max( width, height ) / Math.hypot( width, height )
    //         materialCloned.uniforms.uImageSize.value = tile.imgNaturalSize;
    //
    //         ref.current.material = materialCloned
    //         ref.current.scale.set( width, height, 1 )
    //
    //     }
    //
    //     window.addEventListener( "resize", onResize )
    //     return () => window.removeEventListener( "resize", onResize )
    // }, [ tile ] )
    useEffect( () => {

        const onResize = () => {
            const imageItem         = document.querySelector( ".js-slide" );
            const { width, height } = getBounds( imageItem! );

            const uniforms = {
                uTime     : { value: 0 },
                uAlpha    : { value: 1 },
                uTexture  : { value: 0 },
                uMeshSize : { value: new Vector2( width, height ) },
                uImageSize: { value: new Vector2( 0, 0 ) },
                uScale    : { value: 1 },
                uVelo     : { value: 0 },
                uAngle    : { value: cameraAngle }
            }
            const mat      = new ShaderMaterial( {
                transparent   : true,
                uniforms      : uniforms,
                vertexShader  : vertexShader,
                fragmentShader: fragmentShader
            } )

            loader.load( image, ( texture ) => {
                mat.uniforms.uTexture.value   = texture;
                mat.uniforms.uImageSize.value = imageNaturalSize;
            } )
            mat.uniforms.uScale.value = Math.max( width, height ) / Math.hypot( width, height )

            ref.current.material = mat;
            ref.current.scale.set( width, height, 1 )

        }

        window.addEventListener( "resize", onResize )
        return () => window.removeEventListener( "resize", onResize )
    }, [ tile ] )

    useFrame( () => {

        const absZ    = Math.abs( ref.current.position.z )
        const opacity = Math.min( absZ, 50 ) / 50;

        if ( 0 <= absZ && absZ < 1 )
            output = Math.ceil( absZ )
        else if ( 1 <= absZ && absZ < 2 )
            output = Math.floor( absZ )
        else output = undefined

        if ( output ) store.index = index
        if ( tile.material ) tile.material.opacity = 1 - opacity

        ref.current.position.z = resetPos( length, index, margin, states.position )
        ref.current.rotation.z = 0 - ( amplitude * Math.sin( states.position ) )

    } )

    return (
        <Plane
            ref={ ref }
            material={ tile.material }
            scale={ [ tile.bounds.width, tile.bounds.height, 1 ] }
            args={ [ 1, 1, cols, rows ] }
            onClick={ () => console.log( "Image: " + index + "   |  position: " + ref.current.position.z ) }
        />
    )
}

export default Image;


type ImageProps = {
    image: any,
    index: number,
    length: number,
}
