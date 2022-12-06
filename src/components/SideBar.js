import React from 'react'
import { styled } from '@mui/system'
import NavBar from './NavBar'
import Search from './Search'
import Chats from './Chats'

const Container = styled('div')({
  flex : 1,
  backgroundColor : '#3e3c61',
  '@media (max-width: 1200px)' : {
    position : 'relative'
}
})


function SideBar() {
  return (
    <Container>
      <NavBar/>
      <Search/>
      <Chats/>
    </Container>
  )
}

export default SideBar