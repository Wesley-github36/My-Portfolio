import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import * as THREE from "three";

export default class Effect {

    private readonly gl: THREE.WebGLRenderer;
    private readonly scene: THREE.Scene;
    private readonly camera: THREE.Camera;

    private counter: number;
    private composer: EffectComposer;
    private states: { speed: number, position: number };

    private customPass: ShaderPass | undefined;
    private bloomPass: UnrealBloomPass | undefined;

    constructor(
        gl: THREE.WebGLRenderer,
        scene: THREE.Scene,
        camera: THREE.Camera,
        states: { speed: number, position: number }
    ) {

        this.gl       = gl;
        this.scene    = scene;
        this.camera   = camera;
        this.composer = new EffectComposer( this.gl )

        this.counter = 0.0;
        this.states  = states

        this.addRenderPass()
        this.addBloomPass()
        this.addShaderPass()
    }

    addRenderPass() {
        const renderPass = new RenderPass( this.scene, this.camera );
        this.composer.addPass( renderPass );
    }

    addShaderPass() {
        const fragmentShader = `
            uniform float amount;
            uniform sampler2D tDiffuse;
            varying vec2 vUv;

            float random( vec2 p ) {
                vec2 K1 = vec2(
                    23.14069263277926, // e^pi (Gelfond's constant)
                    2.665144142690225 // 2^sqrt(2) (Gelfondâ€“Schneider constant)
                );
                return fract( cos( dot(p,K1) ) * 12345.67890 );
            }

            void main() {
                vec4 color = texture2D( tDiffuse, vUv );
                vec2 uvRandom = vUv;
                uvRandom.y *= random(vec2(uvRandom.y,amount));
                color.rgb += random(uvRandom)*0.08;
                gl_FragColor = vec4( color  );
            }
        `
        const vertexShader   = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
        `

        const effect = {
            uniforms      : {
                "tDiffuse": { value: null },
                "amount"  : { value: this.counter }
            },
            vertexShader  : vertexShader,
            fragmentShader: fragmentShader
        }

        this.customPass                = new ShaderPass( effect );
        this.customPass.renderToScreen = true;
        this.composer.addPass( this.customPass );
    }

    addBloomPass() {
        const params = {
            exposure      : 0.1,
            bloomStrength : 0.3,
            bloomThreshold: 0,
            bloomRadius   : 0
        };

        this.bloomPass           = new UnrealBloomPass(
            new THREE.Vector2( window.innerWidth, window.innerHeight ),
            1.5,
            0.1,
            0.1
        )
        this.bloomPass.threshold = params.bloomThreshold;
        this.bloomPass.strength  = params.bloomStrength;
        this.bloomPass.radius    = params.bloomRadius;

        this.composer.addPass( this.bloomPass )
    }

    simulate() {
        this.counter += 0.01;


        if ( this.customPass )
            this.customPass.uniforms[ "amount" ].value = this.counter;

        if ( this.bloomPass )
            this.bloomPass.strength = Math.abs( 0.6 * this.states.speed )

        this.composer.render()
    }
}
