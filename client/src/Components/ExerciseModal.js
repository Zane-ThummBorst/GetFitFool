import { Button, Modal, Slider, Box, TextField } from "@mui/material"
import { MyContext } from "../MyContext"
import { useContext } from "react"


// rep range, sets, starting weight
const ExerciseModal = ({exercise}) =>{
    const {HandleSubmit, open, setOpen, repRange, setRepRange, currentDay, sets, setSets, summary, setSummary, startingWeight, setStartingWeight, exerciseId,setEdit, edit, HandleUpdate} = useContext(MyContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      

    const handleClose = () =>{
        setOpen(false)
        setEdit(false)
        setRepRange([0,50])
        setSets(0)
        setSummary("")
        setStartingWeight(0)
    }


    const handleSet = (event, setFunction) =>{
        setFunction(event.target.value)
    }


    const buildSubmission = () =>{
        const result =  {
            "number_of_sets": sets,
            "rep_range": repRange,
            "starting_weight": startingWeight,
            "personal_best": 0,
            "notes": [],
            "summary": summary,
            "name":  exercise.name,
            "images":  exercise.images,
            "primaryMuscles": exercise.primaryMuscles
        }

        if(!edit)
            HandleSubmit(currentDay,  { id: crypto.randomUUID(), info:  result })
        else
            HandleUpdate(currentDay, {id: exerciseId, info: result})
        // HandleSubmit(currentDay,  { id: crypto.randomUUID(), info:  result })

        handleClose()


    }
    return(
        <>
        <Modal
        open ={open}
        onClose={handleClose}>
            <Box
            sx = {style}>
                <img width={600} height={400} src={exercise && exercise.images && exercise.images.length > 0 ? exercise.images[0] : ""}/>
                <Slider
                value={repRange}
                onChange={(event) =>{handleSet(event, setRepRange)}}
                 valueLabelDisplay="on"
                 max={50}
                 ></Slider>
                
                <TextField 
                label={"Number of Sets"}
                inputProps={{ type: 'number'}}
                value={sets}
                onChange={(event) =>{handleSet(event, setSets)}}
                 />
                <TextField
                label={"Starting Weight"}
                inputProps={{ type: 'number'}}
                value={startingWeight}
                onChange={(event) =>{handleSet(event, setStartingWeight)}}
                />
                <TextField
                multiline
                label={"Summary"}
                value={summary}
                onChange={(event) =>{handleSet(event, setSummary)}}
                />
                <Button onClick={buildSubmission}>Submit</Button>
            </Box>
        </Modal>
        </>
    )
}

export default ExerciseModal