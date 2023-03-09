import FlexScene from './FlexScene'
import React from 'react'

import Titles from './Titles'
import Images from '@components/other/Images'
import { Box } from "@react-three/flex"

const Home = ()  => {
  return (
    <FlexScene
      dir="column"
    >
      <Box centerAnchor width="100%" height="100%">
		<Images />
	  </Box>
    </FlexScene>
  )
}


export default Home
