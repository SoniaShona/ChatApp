import React, {useContext, useRef, useEffect} from 'react'
import { styled } from '@mui/system'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Container = styled('div')({
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
  '&.owner': {
    flexDirection: 'row-reverse'
  }
})

const MessageInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: 'gray',
  fontWeight: '300',
  
})

const TimeInfo = styled('span')({
  maxWidth : '50px',
  fontSize : '11px'
})

const Avatar = styled('img')({
  backgroundColor: '#ddddf7',
  height: '50px',
  width: '50px',
  borderRadius: '50%',
  objectFit: 'cover'
})


const MessageContent = styled('div')({
  maxWidth: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  '&.owner': {
    alignItems : 'flex-end',

  }
})

const MessageContentText = styled('p')({
  backgroundColor: 'white',
  padding: '10px 15px',
  borderRadius: '0px 10px 10px 10px',
  maxWidth : 'max-content',
  '&.owner': {
    backgroundColor: '#717091',
    color : 'white',
    borderRadius: '10px 0px 10px 10px',

  }

})

const MessageContentImg = styled('img')({
  width: '50%',

})


function Message({message}) {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({behavior: 'smooth'})
  }, [message])

  // console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(message.date))
  
  const dateMessage = new Date(message.date.seconds * 1000 + message.date.nanoseconds / 1000000)
  
  return (
    <Container ref={ref} className={message.senderId === currentUser.uid && 'owner' }>
      <MessageInfo>
        <Avatar src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' />
        <TimeInfo>{dateMessage.getDate()+'/'+ dateMessage.getMonth()+'/'+dateMessage.getFullYear()+' '+dateMessage.toLocaleTimeString()}</TimeInfo>
      </MessageInfo>
      <MessageContent className={message.senderId === currentUser.uid && 'owner'}>
        {message.text && <MessageContentText className={message.senderId === currentUser.uid && 'owner'}>
          {message.text}
        </MessageContentText>}
        {message.image && <MessageContentImg src={message.image} alt=''/>}
      </MessageContent>
    </Container>
  )
}

export default Message