import React,{useContext, useEffect, useState} from 'react'
import { styled } from '@mui/system'
import Message from './Message'
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase';


const Container = styled('div')({
    backgroundColor :'#ddddf7',
    padding : '10px',
    height : 'calc(100% - 160px)',
    overflowY : 'scroll',
})

function Messages() {
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db,'chats',data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unsub()
    }
  }, [data.chatId])

  console.log(messages)
  return (
    <Container>
      {messages.map((message) => <Message key={message.id} message={message}/>)}
    </Container>
  )
}

export default Messages