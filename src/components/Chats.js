import React, { useState, useEffect, useContext } from 'react'
import { styled } from '@mui/system'
import { db } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from "firebase/firestore"

const Container = styled('div')({
  height : 'calc(100% - 122px)',
  overflowY : 'scroll',
})

const UserChat = styled('div')({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: 'white',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#2f2d52'
  }
})

const Avatar = styled('img')({
  backgroundColor: '#ddddf7',
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  objectFit: 'cover'
})

const UserChatInfo = styled('div')({

})

const UserName = styled('span')({
  fontWeight: '500',
  fontSize: '18px',
})

const LastMessage = styled('p')({
  fontSize: '14px',
  color: 'lightgray',
})


function Chats() {

  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch} =  useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])

  const handleSelectUser = (userInfo) => {
    dispatch({type: 'CHANGE_USER', payload :userInfo })
  }


  return (
    <Container>
      {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date ).map(chat => (
        <UserChat key={chat[0]} onClick={()=>handleSelectUser(chat[1].userInfo)}>
          <Avatar src={chat[1].userInfo.photoURL} alt='' />
          <UserChatInfo>
            <UserName>{chat[1].userInfo.displayName}</UserName>
            <LastMessage>{chat[1].lastMessage?.text}</LastMessage>
          </UserChatInfo>
        </UserChat>
      ))}


    </Container>
  )
}

export default Chats