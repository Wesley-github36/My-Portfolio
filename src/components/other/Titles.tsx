import React, { useEffect, useRef } from "react";
import { Group, Mesh }              from "three";
import { useFlexSize, Box }              from "@react-three/flex";

import Projects     from "@data/Projects";
import Title        from "@components/other/Title";
import { store }    from "@util/index";

const Titles = (
    {
        overlay, 
		width
    }: { overlay?: boolean | undefined }
) => {
    const projects  = [
        ...Projects, ...Projects,
        ...Projects, ...Projects, ...Projects
    ]
    const group     = useRef<Group>( null! )
	
    useEffect( () => {
        store.midPos = NaN

        group.current.children.forEach( ( mesh, index ) => {

            if ( isNaN( store.midPos ) && mesh.position.y >= 0 ) {
                store.index  = index
                store.midPos = mesh.position.y
            }

            else if ( mesh.position.y >= 0 && mesh.position.y < store.midPos ) {
                store.index  = index
                store.midPos = mesh.position.y
            }
        } )

    }, [ width ] )

    return (
        <group ref={ group }>
            {
                projects.map( ( project, index ) => (
                    <Title key={ `title-${ index }` }
                           text={ project.title }
                           index={ index }
                           projectCount={ projects.length }
                           overlay={ overlay }
						   width={width}
                    />
                ) )
            }
        </group>
    )
}

export default Titles;
