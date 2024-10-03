import { useEffect, useState, useContext } from "react";
import CenteredLayout from "./layouts/CenteredLayout"
import { MyContext } from "../MyContext";
import axios from "axios";
import { Grid2, Box, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


let typoStyle = {
    width:'100px', 
  }
  
  let typoStyle2 = {
    width:'300px', 
  }

  

const PersonalRoutines = () =>{
    const [routines, setRoutines] = useState([])
    const {userInfo, setCurRoutineUUID, setCurSechdule} = useContext(MyContext)
    const navigate = useNavigate();


    useEffect(()=>{
        const getRoutines = async() =>{
            try{
                let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/GetRoutines`,{
                    routineUuids: userInfo.personal_routines
                })
                setRoutines(result.data)
            }catch{
                console.log('ligma')
            }
        }
        getRoutines()
    }, [userInfo.personal_routines])

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
        console.log(routineSchedule)
        setCurRoutineUUID(routineId)
        setCurSechdule(routineSchedule)
        navigate('/')
    }

    return(
        <>
        <CenteredLayout size={4}>
            {routines == [] ? <p>Loading</p> : routines.map((routine) =>{
                return(
                    
                    <Box onClick={() =>{ navigateTo(routine.uuid, routine.schedule)}}>
                        <Paper sx={{ display:"flex", justifyContent:"space-between", padding: '1em', mt: 3}}>
                            <Typography sx={typoStyle2}>{routine.name}</Typography>
                            <Typography sx={typoStyle}>{routine.totalExercises}</Typography>
                            {routine.public ? <Typography sx={typoStyle}>public</Typography>  : <Typography sx={typoStyle}>private</Typography>}
                            <Box sx={{display:'flex'}}>{dayList(routine)}</Box>
                        </Paper>
                    </Box>
                )
            })}
        </CenteredLayout>
        </>
    )
}

export default PersonalRoutines;