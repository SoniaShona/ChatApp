import React from 'react'
import { styled } from '@mui/system'
import SideBar from '../components/SideBar'
import Chat from '../components/Chat'

const Container = styled('div')({
  width: '100vw',
  height: '100vh',
  background: '#a7bcff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Wrapper = styled('div')({
  border: '1px solid white',
  borderRadius : '10px',
  width : '70%',
  height : '85%',
  display : 'flex',
  overflow : 'hidden',
  '@media (max-width: 1200px)' : {
    width: '90%',
}
})


function Home() {
  return (
    <Container>
      <Wrapper>
        <SideBar />
        <Chat />
      </Wrapper>
    </Container>
  )
}

export default Home