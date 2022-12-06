import React, { useContext } from 'react'
import { styled } from '@mui/system'
import {signOut} from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Container = styled('div')({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#2f2d52',
  height: '50px',
  padding: '10px',
  justifyContent: 'space-between',
  color: '#ddddf7',
  
})

const Logo = styled('span')({
  fontWeight: 'bold',
  '@media (max-width: 1200px)' : {
    display : 'none'
}
})

const UserInfo = styled('div')({
  display: 'flex',
  gap: '10px',
  
})

const Avatar = styled('img')({
  backgroundColor : '#ddddf7',
  height : '24px',
  width : '24px',
  borderRadius : '50%',
  objectFit : 'cover'
})

const UserName = styled('span')({

})

const Button = styled('button')({
  color : '#ddddf7',
  backgroundColor : '#5d5b8d',
  fontsize : '10px',
  border : 'none',
  cursor :'pointer',
  '@media (max-width: 1200px)' : {
    position : 'absolute',
    bottom : '10px',
}
  
})

function NavBar() {
  const {currentUser} = useContext(AuthContext)

  const handleLogout = () =>{
    signOut(auth)
  }


  return (
    <Container>
      <Logo>SHONA Chat</Logo>
      <UserInfo>
        <Avatar src={currentUser.photoURL} alt=''></Avatar>
        <UserName>{currentUser.displayName}</UserName>
        <Button onClick={handleLogout}>Logout</Button>
      </UserInfo>
    </Container>
  )
}

export default NavBar