import { useThree } from '@react-three/fiber';
import { Box } from '@react-three/flex';
import React, { useRef } from 'react'
import { Mesh } from 'three';

import Title from './Title';
import Projects from '@data/Projects';

const projects = [...Projects, ...Projects, ...Projects,
...Projects, ...Projects]

const Titles = () => {

    return (
        <Box 
            dir="column"
            height="auto"
            width="100%"
            minHeight="100%"
            alignItems="flex-start"
            justifyContent="flex-start"
            centerAnchor
        >
            {
                projects.map((project, index) => (
                    <Title
                        key={ `title-${index}`}
                        index={index}
                        text={project.title}
                        length={projects.length}
                    />
                ))
            }
        </Box>
    )
}

export default Titles;