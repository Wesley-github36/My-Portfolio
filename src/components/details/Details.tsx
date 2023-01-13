import React, { useEffect, useRef, useState } from "react";
import { Group } from "three";

import ProjectDetails, { IProjectDetails } from "@data/ProjectDetails";
import Images from "@components/details/Images"

import { useActivePageAndIndex } from "@hooks/ContextProvider";
import { DeepLink } from "@data/index";

const Details = () => {

    const ref = useRef<Group>();
    const { index, activePage } = useActivePageAndIndex()

    const detailsProject = findProjectDetails( index.get );
    const visibility = useToggleDisplay( activePage.get )

    return (
        <group
            ref={ ref }
            visible={ visibility.parent }
        >
            { detailsProject && (
                <Images
                    project={ detailsProject }
                    visibility={ visibility.children }
                />
            ) }
        </group>
    )
}

export default Details;


/*
 * Utils and helpers
 */
const findProjectDetails = ( index: number ) => {
    const [ details, setDetails ] = useState<IProjectDetails | null>();

    useEffect( () => {

        const findProject = ProjectDetails.find( project => project.id === ( index % 6 ) )
        if ( findProject ) setDetails( findProject )

    }, [ index ] )

    return details
}

const useToggleDisplay = ( activePage: string ) => {

    const [ parent, setParent ] = useState( false );
    const [ children, setChildren ] = useState( false );

    useEffect( () => {

        if ( activePage !== DeepLink.DETAILS ) setChildren( false )

        const display = setTimeout( () => {

            if ( activePage === DeepLink.DETAILS ) {
                setParent( true )
                setChildren( true )
            }
            else
                setParent( false )
        }, 500 )

        return () => clearTimeout( display )

    }, [ activePage ] )

    return {
        parent: parent,
        children: children
    }
}





