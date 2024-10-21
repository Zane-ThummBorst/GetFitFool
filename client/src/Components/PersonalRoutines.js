import { useEffect, useState, useContext } from "react";
import CenteredLayout from "./layouts/CenteredLayout"
import { MyContext } from "../MyContext";
import axios from "axios";
import { Grid2, Box, Paper, Typography, Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import PublicModal from "./PublicModal";


let typoStyle = {
    width:'100px', 
  }
  
  let typoStyle2 = {
    width:'200px', 
  }

const scrollStyle = {
display: "flex",
flexDirection: "column",
borderRadius: '1em',
p: 1,
overflow: "auto",
scrollbarWidth: "none", // Hide the scrollbar for firefox
'&::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
},
'&-ms-overflow-style:': {
    display: 'none', // Hide the scrollbar for IE
},
maxHeight: {
    xs: '300px',
    sm: '400px',
    md: '500px',
    lg: '600px',
    xl: '700px',
  },
}
  

const PersonalRoutines = () =>{
    const {userInfo, curRoutineUUID, setCurRoutineUUID, setCurSechdule, routineIdList, setRoutineIdList, routines, setRoutines} = useContext(MyContext)
    const navigate = useNavigate();

    const [open,setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    const handleDelete = (event,routineId) =>{
        event.stopPropagation();
        setOpen(true)
        setCurRoutineUUID(routineId)
    }

    const handlePublic = (event, routineId) =>{
        event.stopPropagation();
        setOpen2(true)
        setCurRoutineUUID(routineId)   
        console.log(routineId)
    }


    useEffect(()=>{
        const getRoutines = async() =>{
            try{
                let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/GetRoutines`,{
                    routineUuids: routineIdList
                })
                setRoutines(result.data)
            }catch{
                console.log('ligma')
            }
        }
        getRoutines()
    }, [routineIdList])

    const dayList = (routine) =>{
        let result = ''
       return( Object.keys(routine.schedule).map(day =>{
            if(routine.schedule[day].exercises.length !== 0)
                return(<Typography sx={{mx:0.5}}>{day[0]+day[1]}</Typography>)
            else
                return(<Typography color="textDisabled" sx={{mx: 0.5}}>{day[0]+day[1]}</Typography>)
        }))
    }



    const navigateTo = (routineId, routineSchedule) =>{
        setCurRoutineUUID(routineId)
        setCurSechdule(routineSchedule)
        navigate('/Routine_Creation')
    }

    const handleBoxClick = (event, routine) => {
        navigateTo(routine.uuid, routine.schedule);
    };



    return (
        <>
                {routines.length === 0 ? <p>Loading</p> : routines.map((routine) => (
                   
                        <Paper 
                        key={routine.id}
                        onClick={(event) => handleBoxClick(event, routine)}
                        sx={{ display: "flex", justifyContent: "space-between", padding: '1em', mt: 3, alignItems: 'center' }}>
                            <Typography sx={typoStyle2}>{routine.name}</Typography>
                            <Typography sx={typoStyle}>{routine.totalExercises}</Typography>
                            {routine.public ? <Typography sx={typoStyle}>public</Typography> : <Typography sx={typoStyle}>private</Typography>}
                            <Typography sx={typoStyle2}><Box sx={{display:'flex'}}>{dayList(routine)}</Box> </Typography>
                            <Typography sx={typoStyle}>
                                <ButtonGroup  size="small"  orientation="vertical">
                                    <Button onClick={(event) =>handleDelete(event,routine.uuid)}>Delete</Button>
                                    <Button onClick={(event) =>{handlePublic(event, routine.uuid)}}>public</Button>
                                </ButtonGroup> 
                            </Typography>
                        </Paper>
                ))}
            <MyContext.Provider value={{ open, setOpen, curRoutineUUID, userInfo, routineIdList, setRoutineIdList }}>
                <ConfirmModal message={curRoutineUUID} />
            </MyContext.Provider>
            <MyContext.Provider value={{ open2, setOpen2, curRoutineUUID, userInfo}}>
                <PublicModal message={curRoutineUUID} />
            </MyContext.Provider>
        </>
    );
};

export default PersonalRoutines;