import { Button, Modal, Slider, Box, TextField, Grid2, Typography, Grid } from "@mui/material"
import { MyContext } from "../MyContext"
import { useContext } from "react"


// rep range, sets, starting weight
const ExerciseExpandedView = ({exercise}) =>{
    const {HandleSubmit, open2, setOpen2, repRange, setRepRange, currentDay, sets, setSets, summary, setSummary, startingWeight, setStartingWeight} = useContext(MyContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        
      };

      const TypographyStyle = {
        width: '200px',
        fontSize: 'h4.fontSize'
      }

      const TypographyStyleHeader = {
        width: '200px',
        fontWeight: 600,
        fontSize: 'h4.fontSize'
      }

      const RowStyle = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-end",
        mt:3,
        
      }
      

    const handleClose = () =>{
        setOpen2(false)
    }

    const printExercise = () =>{
        console.log(exercise)
    }

    const handleSet = (event, setFunction) =>{
        setFunction(event.target.value)
    }


    return(
        <>
        <Modal
        open ={open2}
        onClose={handleClose}>
            <Box sx = {style}>

                <Typography  fontSize= 'h4.fontSize'>{exercise.name}</Typography>
                <Grid2 sx={{mt:3}} container spacing={2} columns={10}>
                    <Grid2 size={6}>
                    <Box
                        component={'img'}
                        sx={{
                            width: 600,
                            height: 400,
                            borderRadius: 3
                        }}
                        src={exercise && exercise.images && exercise.images.length > 0 ? exercise.images[0] : ""}
                    />
                        
                    </Grid2>
                    <Grid2 size={4}>
                    <Box sx = {RowStyle}>
                        <Typography sx = {TypographyStyleHeader}>Force</Typography>
                        <Typography sx = {TypographyStyle}>{exercise.force}</Typography>
                    </Box>
                    <Box sx = {RowStyle}>
                        <Typography  sx = {TypographyStyleHeader}>Level</Typography>
                        <Typography sx = {TypographyStyle}>{exercise.level}</Typography>
                    </Box>
                    <Box sx = {RowStyle}>
                        <Typography  sx = {TypographyStyleHeader}>Mechanic</Typography>
                        <Typography  sx = {TypographyStyle}>{exercise.mechanic}</Typography>
                    </Box>
                    <Box sx = {RowStyle}>
                        <Typography  sx = {TypographyStyleHeader}>Catgory</Typography>
                        <Typography  sx = {TypographyStyle}>{exercise.category}</Typography>
                    </Box>
                    <Box sx = {RowStyle}>
                        <Typography  sx = {TypographyStyleHeader}>Muscle</Typography>
                        <Typography  sx = {TypographyStyle}>{exercise.primaryMuscles ? exercise.primaryMuscles[0] : ""}</Typography>
                    </Box>
                    </Grid2>
                </Grid2>
                <Grid2 container sx={{mt:3}}>
                    <Typography sx = {TypographyStyleHeader}>Instructions</Typography>
                    <Box>
                        { exercise.instructions ? exercise.instructions.map((instruction, index) =>{
                            return(
                                <Typography>{index+1}. {instruction}</Typography>
                            )
                        }) : ""}
                    </Box>
                </Grid2>
            </Box>
        </Modal>
        </>
    )
}

export default ExerciseExpandedView