import { Box, Container, Flex } from '@chakra-ui/react'
import Logo from '../assets/Vector2.svg'
import React from 'react'

const MainPage = () => {

  return (
    <Container>
        <Box position="fixed" display="flex"  left="30px" mt="20px" bottom="-1">
            <Flex justifyContent="center">
            <img  src={Logo}/>
            </Flex>
        </Box>
    </Container>
  )
}

export default MainPage