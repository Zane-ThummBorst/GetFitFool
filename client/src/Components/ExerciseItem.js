import RegularList from "./layouts/RegularList";
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {Button, Paper, Box, Typography, Image, ButtonGroup} from '@mui/material'
import { MyContext } from '../MyContext'

const ExerciseItem = ({item}) =>{
    const {handleAddExercise, handleExpandExercise} = useContext(MyContext)
    const [imageNumber, setImageNumber] = useState(0)
    return(
        <Paper container elevation={6} sx={{mt: '1em',py:1, display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <h1>{item.name}</h1>
            <Box
            component={'img'}
            sx={{
                width: 300,
                height: 200,
                borderRadius: 3
            }}
            onMouseEnter={() => {setImageNumber(1)}}
            onMouseLeave={() =>setImageNumber(0)}
            src = {`${item.images[imageNumber]}`}
            >
            </Box>
            <ButtonGroup sx={{mt:3}}>
                <Button onClick ={() =>handleExpandExercise(item)}>Expand</Button>
                <Button onClick ={() =>handleAddExercise(item)}>add</Button>
            </ButtonGroup>
        </Paper>
    )
}

export default ExerciseItem