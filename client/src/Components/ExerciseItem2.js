import { Typography, Paper, Box } from "@mui/material"
import { useState } from "react"
import { useContext } from "react"
import { MyContext } from "../MyContext"

const ExerciseItem2 = ({item}) =>{
    const {handleAddExercise} = useContext(MyContext)
    const [imageNumber, setImageNumber] = useState(0)
    return(
        <>
        <Paper onClick={() => handleAddExercise(item.name)} container elevation={6} sx={{mx: 4, mt: '1em',py:1, display: 'flex', flexDirection:'column', alignItems:'center'}}>
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
        </Paper>
        </>
    )
}

export default ExerciseItem2