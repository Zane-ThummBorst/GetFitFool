import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField, Button, Paper} from '@mui/material'
import { MyContext } from '../MyContext'
import CenteredLayout from './layouts/CenteredLayout'


const UpdateUserForm = () =>{

    const {userInfo, setUserInfo, login, setLogin} = useContext(MyContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const TextFieldStyle = {
        mt: 2
    }

    useEffect(() => {
        setUsername(userInfo.username || '');
        setEmail(userInfo.email || '');
    }, [userInfo]); 

    const [errors, setErrors] = useState({})
    
    

    const handleUsername = (event) =>{
        setUsername(event.target.value)
    }


    const handleEmail = (event) =>{
        setEmail(event.target.value)
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

    const handleSubmission = async() =>{
        if(handleValidation()){
            await axios.post(`${process.env.REACT_APP_API_URL}/users/updateUser`,{
                username: username,
                email: email
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            .then(response =>{
                let loginStatus =login
                setLogin(!loginStatus)
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
                
                <TextField sx ={TextFieldStyle}
                value={username}
                label='Username'
                onChange= {handleUsername}
                error = {errors.username !== undefined}
                helperText = {errors.username}
                required
                />

                <TextField sx ={TextFieldStyle}
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

export default UpdateUserForm