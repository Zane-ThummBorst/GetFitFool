
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField, Button, Paper} from '@mui/material'
import { MyContext } from '../MyContext'
import CenteredLayout from './layouts/CenteredLayout'



const CreateRoutine = () =>{
    const [name, setName] = useState('')
    const [summary, setSummary] = useState('')

    
    const TextFieldStyle = {
        mt: 2
    }

    const handleName = (event) =>{
        setName(event.target.value)
    }

    const handleSummary = (event) =>{
        setSummary(event.target.value)
    }

    const handleSumbission = async() =>{
        try{
            let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/createRoutine`,{
                name: name,
                summary: summary
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            console.log(result.data)

            let result2 = await axios.put(`${process.env.REACT_APP_API_URL}/users/LikesAndClones`,{
                routineId: result.data,
                operation: '$push',
                operationField: 'personal_routines'

            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            }
        )
        }catch{
            alert('You aint going nowhere')
        }
    }
    return(
        <>

            <CenteredLayout size={3}>
            <Paper sx={{display: 'flex', flexDirection:'column', p:1}}>

            <TextField sx={TextFieldStyle}
            label='Routine Name'
            value={name}
            onChange={handleName}
            />

            <TextField sx={TextFieldStyle}
            label='Summary'
            value={summary}
            onChange={handleSummary}
            multiline
            rows={4}
            />

            
            <Button onClick={handleSumbission}>Submit</Button>
            </Paper>
            </CenteredLayout>
        </>
    )
}

export default CreateRoutine;