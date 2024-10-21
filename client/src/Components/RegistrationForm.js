import axios from 'axios'
import { useContext,useState } from 'react'
import {TextField, Button, Paper} from '@mui/material'
import CenteredLayout from './layouts/CenteredLayout'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../MyContext'

const RegistrationForm = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const {login, setLogin} = useContext(MyContext)

    const [errors, setErrors] = useState({})
    
    const navigate = useNavigate()

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }

    const handlePassword = (event) =>{
        setPassword(event.target.value)
    }

    const handleEmail = (event) =>{
        setEmail(event.target.value)
    }

    const TextFieldStyle = {
        mt: 2
    }

    //prototype
    const handleValidation = () =>{
        let newErrors = {...errors}
        let result = true
        if(username.length < 4 || username.length > 20 || typeof username != "string"){
            result = false
            newErrors.username = "username must be between 4 and 20 characters"
        }else{
            delete newErrors.username
        }

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
            axios.post(`${process.env.REACT_APP_API_URL}/users/createUser`,{
                username: username,
                password: password,
                email: email
            })
            .then(response =>{
                localStorage.setItem('jwt_token',response.data)
                let loginStatus = login
                setLogin(!loginStatus)
                navigate('/Public Routines')
            })
            .catch(error =>{
                alert("internal server error")
            })
        }
    }

    return(
        <>
        <CenteredLayout size={3}>
            <Paper sx={{display: 'flex', flexDirection:'column', p:1}}>
            <TextField sx={TextFieldStyle}
            value={username}
            label='Username'
            onChange= {handleUsername}
            error = {errors.username !== undefined}
            helperText = {errors.username}
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

            <TextField sx={TextFieldStyle}
            value={email}
            label='Email'
            onChange= {handleEmail}
            error = {errors.email !== undefined}
            helperText = {errors.email}
            required
            />


            <Button onClick={handleSubmission}>SUBMIT</Button>
            </Paper>
        </CenteredLayout>
        </>
    )
}

export default RegistrationForm