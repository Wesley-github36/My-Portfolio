import React, { useEffect, useRef, useState } from "react";
import { useFlexSize }                        from "@react-three/flex";
import { Group }                              from "three";
import { gsap }                               from "gsap";
import { useNavigate }                        from "react-router-dom";


import Image     from "@components/other/Image";
import { store } from "@util/index";
import Projects  from "@data/Projects";


const Images = () => {

    const projects                    = [
        ...Projects, ...Projects,
        ...Projects, ...Projects,
        ...Projects
    ]
    const [ width ]                   = useFlexSize()
    const group                       = useRef<Group>( null! )
    const [ onAnimate, setOnAnimate ] = useState( false )
    const navigate                    = useNavigate()


    useEffect( () => {
        const mesh = group.current.children.find( ( child => child.userData.index === store.index ) )

        if ( mesh ) {
            store.groupCenter = -mesh.position.z

            gsap.to( group.current.position, {
                z       : -mesh.position.z,
                duration: 0.6,
                ease    : "expo.easeOut"
            } )
        }

    }, [ width ] )

    const onNavigate = () => {
        const absCenter = Math.abs( store.groupCenter )
        const topMesh   = group.current.children.find( child =>
            Math.round( absCenter ) === Math.round( Math.abs( child.position.z ) )
        )

        if ( topMesh ) {
            setOnAnimate( true )

            gsap.to( group.current.position, {
                z         : group.current.position.z + 30,
                duration  : 1,
                ease      : "expo.easeIn",
                onComplete: () => navigate( `work/${ topMesh.userData.link }` )
            } )
        }

    }

    return (
        <group
            ref={ group }
            onClick={ () => onNavigate() }
        >
            {
                projects.map( ( project, index ) => (
                    <Image key={ `image-${ index }` }
                           image={ project.avatar }
                           index={ index }
                           projectCount={ projects.length }
                           link={ project.link }
                           onAnimate={ onAnimate }
                    />
                ) )
            }
        </group>
    )
}

export default Images;
