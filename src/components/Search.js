import React, { useContext, useState } from 'react'
import { styled } from '@mui/system'
import { db } from '../firebase'
import { doc,collection, query, where, getDocs,getDoc,setDoc,updateDoc, Timestamp } from "firebase/firestore";
import { ChatContext } from '../context/ChatContext'
import {AuthContext} from '../context/AuthContext'

const Container = styled('div')({
  borderBottom: '1px solid gray'
})

const Form = styled('div')({
  padding: '10px'
})

const Input = styled('input')({
  backgroundColor: 'transparent',
  width: '100%',
  border: 'none',
  color: 'white',
  outline: 'none',
  marginBottom: '10px',
  // borderBottom: '1px solid gray',
  '&::placeholder': {
    color: 'lightgray',
  }
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

})

function Search() {
  const [userNameSearched, setUserNameSearched] = useState('')
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')

  const {currentUser} = useContext(AuthContext)
  const { dispatch} =  useContext(ChatContext)

  const handleSearch = async () => {

    try {
      const q = query(collection(db, "users"), where("displayName", "==", userNameSearched))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        setUsers(doc.data())
      });
    }
    catch (err) {
      setError('Something went wrong')
    }
  }

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  }

  const handleSelect = async () => {
    const combinedId = currentUser.uid > users.uid ? currentUser.uid + users.uid : users.uid + currentUser.uid
    try {
      const res = await getDoc(doc(db, "chats", combinedId))
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), {messages: []})
        await updateDoc(doc(db,'userChats', currentUser.uid),{
          [combinedId+'.userInfo'] : {
            uid : users.uid,
            displayName : users.displayName,
            photoURL : users.photoURL
          }, 
          [combinedId+'.date'] :Timestamp.now()
        })

        await updateDoc(doc(db,'userChats', users.uid),{
          [combinedId+'.userInfo'] : {
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          }, 
          [combinedId+'.date'] :Timestamp.now()
        })
      }
    }
    catch (err) {
      setError('Something went wrong')
    }

    dispatch({type: 'CHANGE_USER', payload :{
      displayName : users.displayName,
      photoURL : users.photoURL,
      uid : users.uid
    } })
    
    setUsers(null)
    setUserNameSearched("")
  }

  return (
    <Container>
      <Form>
        <Input type='text' placeholder='Search...' value={userNameSearched} onKeyDown={handleKey} onChange={e => setUserNameSearched(e.target.value)}></Input>
      </Form>
      {error && <span>User not found !</span>}
      {users && 
        <UserChat onClick={handleSelect}>
          <Avatar src={users.photoURL} alt='' />
          <UserChatInfo>
            <UserName>{users.displayName}</UserName>
          </UserChatInfo>
        </UserChat>
      }
    </Container>
  )
}

export default Search