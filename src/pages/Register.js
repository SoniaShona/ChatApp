import React, { useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { styled } from '@mui/system'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 



const Container = styled('div')({
    width: '100vw',
    height: '100vh',
    background: '#a7bcff', //'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const Wrapper = styled('div')({
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '1px 1px 4px 4px gray',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'center',
    width: '50%',
})

const Logo = styled('span')({
    color: '#5d5b8d',
    fontWeight: 'bold',
    fontSize: '24px'
})

const Title = styled('span')({
    color: '#5d5b8d',
    fontSize: '16px'
})

const Form = styled('form')({
    display: 'flex',
    width: '90%',
    flexDirection: 'column',
    gap: '15px'
})


const Input = styled('input')({
    padding: '10px',
    border: 'none',
    borderBottom: '1px solid #5d5b8d',
    '&::placeholder': {
        color: 'rgb(175,175,175)'
    }
})

const Label = styled('label')({
    display: 'flex',
    borderBottom: '1px solid #5d5b8d',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer'
})

const TextIcon = styled('span')({
    color: '#5d5b8d',
    padding: '10px',
    fontSize: '14px',

})


const Button = styled('button')({
    border: 'none',
    backgroundColor: '#5d5b8d',
    color: 'white',
    padding: '10px',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginTop: '10px'
})

const Text = styled('span')({
    color: '#5d5b8d',
    fontSize: '16px',
    marginTop: '10px'
})


function Register() {
    const navigate = useNavigate()

    const [error, setError] = useState('')

    const submitRegisterForm = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, username);

            await uploadBytesResumable(storageRef, file).then(
                () => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName : username,
                            photoURL : downloadURL,
                            
                        });
                      
                        await setDoc(doc(db,'users', res.user.uid), {
                            uid : res.user.uid,
                            displayName : username,
                            email : email,
                            photoURL : downloadURL
                        });
                        await setDoc(doc(db,'userChats', res.user.uid), {

                        })
                        navigate('/')
                    });
                }
            );
        }
        catch (err) {
            setError('Something went wrong')
        }        
    }

    return (
        <Container>
            <Wrapper>
                <Logo>
                    SHONA Chat
                </Logo>
                <Title>
                    Register
                </Title>
                <Form onSubmit={submitRegisterForm}>
                    <Input type='text' placeholder='Username'>

                    </Input>
                    <Input type='email' placeholder='Email'>

                    </Input>
                    <Input type='password' placeholder='Password'>

                    </Input>
                    <Input style={{ display: 'none' }} id='file-input' type='file'>

                    </Input>
                    <Label htmlFor='file-input'>
                        <AddPhotoAlternateIcon style={{ color: '#5d5b8d' }} />
                        <TextIcon>Add an Avatar</TextIcon>
                    </Label>
                    <Button>Sign up</Button>
                    {error && <span style={{ color: 'red' }}>{error}</span>}
                </Form>
                <Text>You have an account ? <Link to='/login'>Login</Link></Text>
            </Wrapper>
        </Container>
    )
}

export default Register