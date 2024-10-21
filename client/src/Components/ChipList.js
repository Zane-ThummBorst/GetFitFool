import { useContext } from "react"
import { MyContext } from "../MyContext"
import { Stack, Chip, Button } from "@mui/material"

const ChipList = () =>{

    const {exercises, setExercises} = useContext(MyContext)

    const handleDelete = (exercise) =>{
        setExercises(exercises.filter(exerciseElement =>{
            return exerciseElement !== exercise
        }))
    }


    return(
        <>
        <Stack useFlexGap sx={{mt: 5,  flexWrap: 'wrap'}}direction={'row'}spacing={{ xs: 1, sm: 2 }}>
        {exercises.map((exercise) => {
            return (
                <Chip 
                    label={exercise}
                    onDelete={() => handleDelete(exercise)}/>
    );
})}
        </Stack>
        </>
    )
}

export default ChipList