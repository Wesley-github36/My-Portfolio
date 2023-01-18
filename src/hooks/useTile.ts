import { useEffect, useState } from "react";
import { ShaderMaterial, TextureLoader, Vector2 } from "three";

import { cameraAngle, getBounds } from "@util/index";

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


const useTile = ( img: any ) => {

    const [ material, setMaterial ] = useState<ShaderMaterial | undefined>( undefined );
    const [ bounds, setBounds ]     = useState( {
        width : 0,
        height: 0
    } );

    useEffect( () => {
        const { width, height } = getBounds( document.querySelector( ".js-slide" )! );

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

        loader.load( img, ( texture ) => {
            mat.uniforms.uTexture.value   = texture;
            mat.uniforms.uImageSize.value = imageNaturalSize;
        } )
        mat.uniforms.uScale.value = Math.max( width, height ) / Math.hypot( width, height )

        setMaterial( mat )
        setBounds( { width: width, height: height } )

    }, [] )

    useEffect( () => {
        const onResize = () => {
            const mat               = material!;
            const { width, height } = getBounds( document.querySelector( ".js-slide" )! );

            mat.uniforms.uMeshSize.value = new Vector2( width, height );
            mat.uniforms.uScale.value    = Math.max( width, height ) / Math.hypot( width, height )

            setMaterial( mat )
            setBounds( { width: width, height: height } )
        }

        window.addEventListener( "resize", onResize )
        return () => { window.removeEventListener( "resize", onResize ) }

    }, [ bounds, material ] )

    return { bounds, material };
}


export default useTile;
