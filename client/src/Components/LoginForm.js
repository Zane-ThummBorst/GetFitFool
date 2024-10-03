import axios from 'axios'
import { useContext,useState } from 'react'
import {TextField, Button, Paper} from '@mui/material'
import { MyContext } from '../MyContext'
import CenteredLayout from './layouts/CenteredLayout'

const LoginForm = () =>{

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [errors, setErrors] = useState({})

    const {login, setLogin} = useContext(MyContext)

    const TextFieldStyle = {
        mt: 2
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }

    const handleValidation = () =>{
        let newErrors = {...errors}
        let result = true

        if( /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length >= 8 && password.length <= 20){
                delete newErrors.password
        }else{
            result = false
            newErrors.password = "Password must incude: 1 captial letter, 1 lowercase letter, 1 number, 1 special character, between 8 and 20 characters"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            result = false
            newErrors.email = "Please enter a valid email!"
        }else{
            delete newErrors.email
        }

        setErrors(newErrors)
        return result
        
    }
    
    const handleSubmission = () =>{
        if(handleValidation()){
            axios.post(`${process.env.REACT_APP_API_URL}/users/loginUser`,{
                password: password,
                email: email
            })
            .then(response =>{
                localStorage.setItem('jwt_token',response.data)
                let loginStatus = login
                setLogin(!loginStatus)
            })
            .catch(error =>{
                alert("internal server error")
            })
        }
    }


    return(
        <>
            <CenteredLayout>
            <Paper sx={{display: 'flex', flexDirection:'column', p:1}}>

            <TextField sx={TextFieldStyle}
            value={email}
            label='Email'
            onChange= {handleEmail}
            error = {errors.email !== undefined}
            helperText = {errors.email}
            required
            />
            
            <TextField sx={TextFieldStyle}
            value={password}
            label='Password'
            onChange= {handlePassword}
            type = 'password'
            error = {errors.password !== undefined}
            helperText = {errors.password}
            required
            />

            <Button onClick={handleSubmission}>SUBMIT</Button>
            </Paper>
            </CenteredLayout>
        </>
    )
}

export default LoginForm