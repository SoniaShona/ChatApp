import React, { useState, useContext } from 'react'
import { styled } from '@mui/system'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import SendIcon from '@mui/icons-material/Send'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { db, storage } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


import { v4 as uuid } from 'uuid'


const Container = styled('div')({
  height: '50px',
  backgroundColor: 'white',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})

const InputText = styled('input')({
  backgroundColor: 'transparent',
  fontSize: '16px',
  width: '100%',
  border: 'none',
  outline: 'none',
  color: '#2f2d52',
  '&::placeholder': {
    color: 'lightgray',
  }
})

const SendContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
})

const Label = styled('label')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer'
})

const Button = styled('button')({
  display: 'none'
})






function Input() {

  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid())
      await uploadBytesResumable(storageRef, image).then(
        () => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL
              })
            });
          }
          );
        }
      )
    }
    else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      });
    }
    if (text !== '') {
      await updateDoc(doc(db,'userChats', currentUser.uid), {
        [data.chatId+'.lastMessage'] : {text},
        [data.chatId+'.date'] : Timestamp.now(),
      })
      await updateDoc(doc(db,'userChats', data.user.uid), {
        [data.chatId+'.lastMessage'] : {text},
        [data.chatId+'.date'] : Timestamp.now(),
      })
    }
    else {
      console.log(currentUser.uid)
      await updateDoc(doc(db,'userChats', currentUser.uid), {
        [data.chatId+'.lastMessage'] : { text : currentUser.displayName+' a envoyé une photo'},
        [data.chatId+'.date'] : Timestamp.now(),
      })
      console.log(currentUser.uid)
      await updateDoc(doc(db,'userChats', data.user.uid), {
        [data.chatId+'.lastMessage'] : {text : currentUser.displayName+' a envoyé une photo'},
        [data.chatId+'.date'] : Timestamp.now(),
      })
    }
    setText('')
    setImage(null)
  }

  return (
    <Container>
      <InputText type='text' placeholder='Send a message ...' value={text} onChange={e => setText(e.target.value)} />
      <SendContainer>
        <InputText style={{ display: 'none' }} id='file-input' type='file' />
        <Label htmlFor='file-input'>
          <AttachFileIcon style={{ color: '#5d5b8d' }} />
        </Label>

        <InputText style={{ display: 'none' }} id='img-input' type='file' onChange={e => setImage(e.target.files[0])} />
        <Label htmlFor='img-input'>
          <AddPhotoAlternateIcon style={{ color: '#5d5b8d' }} />
        </Label>

        <Button id='send-button' onClick={handleSend} />
        <Label htmlFor='send-button'>
          <SendIcon style={{ color: '#5d5b8d' }} />
        </Label>
      </SendContainer>




    </Container>
  )
}

export default Input