import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { CycleRaycast, BakeShadows, useCursor, softShadows } from '@react-three/drei'
import styled from 'styled-components'

const TopLeft = styled.div`
  position: absolute;
  top: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: min(10vw, 5em);
  line-height: 0.9em;
`
const BottomLeft = styled.div`
  position: absolute;
  bottom: 6vw;
  left: 6vw;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: min(15vw, 20em);
  line-height: 0.9em;
`
const BottomRight = styled.div`
  position: absolute;
  bottom: 6vw;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  text-align: right;
`
const LeftMiddle = styled.div`
  position: absolute;
  bottom: 50%;
  right: 6vw;
  font-family: 'Inter';
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
`
const Bar = styled.div`
  position: absolute;
  top: ${(props) => (props.vertical ? '0px' : '50%')};
  left: ${(props) => (props.vertical ? '50%' : '0px')};
  width: ${(props) => (props.vertical ? '2px' : '150px')};
  height: ${(props) => (props.vertical ? '150px' : '2px')};
  background: #252525;
`
const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 6vw;
  right: 6vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #252525;
    margin-bottom: 6px;
  }
`

function Underlay() {
    return (
        <>
            <TopLeft>
                <i>Design</i>
                <br />
                Type
            </TopLeft>
            <BottomLeft>B</BottomLeft>
            <BottomRight>
                2021
                <br />
                poimandres
                <br />
                dev collective
            </BottomRight>
            <LeftMiddle>A flight of stairs</LeftMiddle>
            <Hamburger>
                <div />
                <div />
                <div />
            </Hamburger>
            <Bar />
            <Bar vertical />
        </>
    )
}


export default function Scene() {
    const [{ objects, cycle }, set] = useState({ objects: [], cycle: 0 })
    return (
        <>
            {/* CycleRaycast's status data can now be turned into informative HTML */}
            <div className="status">
                {objects.map((_, i) => (<div key={i} className="dot" style={{ background: i === cycle ? '#70ffd0' : '#ccc' }} />)) /* prettier-ignore */}
                {objects.length ? <div className="name" style={{ left: cycle * 14, padding: 2 }} children={objects[cycle].object.name} /> : null}
            </div>
            <Canvas shadows dpr={1.5} camera={{ position: [-10, 10, 5], fov: 50 }}>
                <Stage />
                {Array.from({ length: 12 }, (_, i) => (
                    <Stair
                        key={i}
                        name={'stair-' + (i + 1)}
                        rotation={[-Math.PI / 2, 0, i / Math.PI / 2]}
                        position={[2 - Math.sin(i / 5) * 5, i * 0.5, 2 - Math.cos(i / 5) * 5]}
                    />
                ))}
                {/* This component cycles through the raycast intersections, combine it with event.stopPropagation! */}
                <CycleRaycast onChanged={(objects, cycle) => set({ objects, cycle })} />
            </Canvas>

            <Underlay />
        </>
    )
}

function Stair(props) {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    const [clicked, setClicked] = useState(false)
    useFrame((state) => ref.current.scale.setScalar(hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1))
    // Sets document.body.style.cursor: useCursor(flag, onPointerOver = 'pointer', onPointerOut = 'auto')
    useCursor(hovered)
    return (
        <mesh
            {...props}
            ref={ref}
            receiveShadow
            castShadow
            onClick={(e) => (e.stopPropagation(), setClicked(!clicked))}
            onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
            onPointerOut={(e) => setHovered(false)}>
            <boxGeometry args={[2, 6, 0.075]} />
            <meshStandardMaterial roughness={1} transparent opacity={0.6} color={clicked ? 'lightblue' : hovered ? 'aquamarine' : 'white'} />
        </mesh>
    )
}

function Stage() {
    return (
        <>
            {/* Fill */}
            <ambientLight intensity={0.5} />
            {/* Main */}
            <directionalLight
                position={[1, 10, -2]}
                intensity={1}
                shadow-camera-far={70}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-mapSize={[512, 512]}
                castShadow
            />
            {/* Strip */}
            <directionalLight position={[-10, -10, 2]} intensity={3} />
            {/* Ground */}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.75, 0]}>
                <planeGeometry args={[20, 20]} />
                <shadowMaterial opacity={0.2} />
            </mesh>
            {/* This freezes the shadow map, which is fast, but the model has to be static  */}
            <BakeShadows />
        </>
    )
}

// Percentage closer soft shadows, normally *very* expensive
softShadows()
