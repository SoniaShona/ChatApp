import React, {useContext} from 'react'
import { styled } from '@mui/system'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext'


const Container = styled('div')({
  flex: 2
})

const ChatInfo = styled('div')({
  height: '50px',
  backgroundColor: '#5d5b8d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px',
  color: 'lightgray',
})

const UserName = styled('span')({
  fontWeight : 'bold'
})

const ChatIcons = styled('div')({
  display: 'flex',
  gap: '10px',
})



function Chat() {
  const {data} = useContext(ChatContext)
  return (
    <Container>
      <ChatInfo>
        <UserName>{data.user?.displayName}</UserName>
        <ChatIcons>
          <VideocamIcon style={{ color: 'lightgray', cursor: 'pointer' }} />
          <PersonAddIcon style={{ color: 'lightgray', cursor: 'pointer' }} />
          <MoreHorizIcon style={{ color: 'lightgray', cursor: 'pointer' }} />
        </ChatIcons>
      </ChatInfo>
      <Messages/>
      <Input/>
    </Container>
  )
}

export default Chat