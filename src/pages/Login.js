import React, {useState} from 'react'
import { styled } from '@mui/system'
import {useNavigate, Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';



const Container = styled('div')({
    width: '100vw',
    height: '100vh',
    background: '#a7bcff', //'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const Wrapper = styled('div')({
    backgroundColor : 'white',
    padding : '50px',
    borderRadius : '20px',
    boxShadow : '1px 1px 4px 4px gray',
    display : 'flex',
    flexDirection : 'column',
    gap :'10px', 
    alignItems :'center',
    width : '50%',
})

const Logo = styled('span')({
    color : '#5d5b8d',
    fontWeight : 'bold',
    fontSize : '24px'
})

const Title = styled('span')({
    color : '#5d5b8d',
    fontSize : '16px'
})

const Form = styled('form')({
    display : 'flex',
    width : '90%',
    flexDirection : 'column',
    gap : '15px'
})


const Input = styled('input')({
    padding : '10px',
    border : 'none',
    borderBottom : '1px solid #5d5b8d',
    '&::placeholder' : {
        color : 'rgb(175,175,175)'
    }
})



const Button = styled('button')({
    border : 'none',
    backgroundColor : '#5d5b8d',
    color : 'white',
    padding : '10px',
    fontWeight : 'bold',
    borderRadius : '5px',
    marginTop : '10px'
})

const Text = styled('span')({
    color : '#5d5b8d',
    fontSize : '16px',
    marginTop : '10px'
})



function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const submitLoginForm = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')  
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
                    Login
                </Title>
                <Form onSubmit={submitLoginForm}>
                    <Input type='email' placeholder='Email'>

                    </Input>
                    <Input type='password' placeholder='Password'> 

                    </Input>
                    <Button>Login</Button>
                </Form>
                {error && <span style={{ color: 'red' }}>{error}</span>}
                <Text>You don't have an account ? <Link to='/register'>Register</Link></Text>
            </Wrapper>
        </Container>
    )
}

export default Login