import RegularList from "./layouts/RegularList";
import ExerciseItem from "./ExerciseItem";
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField, Button, Paper, Grid2} from '@mui/material'
import { MyContext } from '../MyContext'
import ExerciseFilters from "./ExerciseFilters";
import ExerciseList from "./ExerciseList";
import RoutineList from "./RoutineList";
import ExerciseModal from "./ExerciseModal";
import ExerciseExpandedView from "./ExerciseExpandedView";



const ExerciseSearch = () =>{

    const {metaData, curRoutineUUID, curSchedule} = useContext(MyContext)
    const [exercises, setExercises] = useState([])
    const [page, setPage] = useState(0)
    const [sizzle, setSizzle] = useState(0)
    const [submit, setSubmit] = useState(false)
    const [input, setInput] = useState('')
    const [mechanic, setMechanic] = useState([])
    const [equipment, setEquipment] = useState([])
    const [category, setCategory] = useState([])
    const [level, setLevel] = useState([])
    const [primaryMuscles, setPrimaryMuscles] = useState([])
    const [day, setDay] = useState("Monday")
    const [schedule, setSchedule] = useState(curSchedule)
    const [exercise, setExercise] = useState({})
    const [dayList, setDayList] = useState(curSchedule);
    
    const [currentDay, setCurrentDay] = useState("Monday");
    const [number, setNumber] = useState(1);
    const [open,setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [repRange, setRepRange] = useState([0,50])
    const [sets, setSets] = useState(0);
    const [summary, setSummary] = useState("");
    const [startingWeight, setStartingWeight] = useState(0) 
    const [edit, setEdit] = useState(false)
    const [exerciseId, setExerciseId] = useState(null)

    useEffect( () =>{
        const getExercises = async() =>{
            // if, then append to payload
            const payload = {limit: 20, offset: page*20}
            if(input)
                payload.input = input
            if(mechanic.length > 0)
                payload.mechanic = mechanic
            if(category.length > 0)
                payload.category = category
            if(equipment.length > 0)
                payload.equipment = equipment
            if(primaryMuscles.length > 0)
                payload.primaryMuscles = primaryMuscles
            if(level.length > 0)
                payload.level = level

            await axios.post(`${process.env.REACT_APP_API_URL}/exercises/getManyExercises`, payload)
            .then(response =>{
                setExercises(response.data.result)
                setSizzle(response.data.size)
                console.log(response.data.size)
            })
            .catch(error =>{
                alert("balls")
            })
        }
        getExercises()
    }, [page, submit])

    const HandleSubmit = (day, value) => {
        //reset variables (should also reset on close)
        setDayList({ ...dayList, [day]: { exercises: [...dayList[day].exercises, value], note: '' }});
        let newNumber = number;
        newNumber += 1;
        setNumber(newNumber);
        console.log(dayList)
      };

    const HandleUpdate = (day, value) => {
        const index = dayList[day].exercises.findIndex(e => e.id == value.id)
        let temp = dayList[day].exercises
        temp[index] = value
        setDayList({ ...dayList, [day]: { exercises: temp }});
        setEdit(false)
        console.log(dayList)
    };

    const handleAddExercise = (newExercise) =>{
        setExercise(newExercise)
        console.log(exercise)
        setOpen(true)

    }

    const handleExpandExercise = (newExercise) =>{
        setExercise(newExercise)
        console.log(exercise)
        setOpen2(true)
    }

    const handleEdit = (id, info) =>{
        setEdit(true)
        setExerciseId(id)
        setExercise(info)
        setOpen(true)
      }

    const submitRoutine = async() =>{
        try{
            await axios.put(`${process.env.REACT_APP_API_URL}/routines/UpdateScheduleRoutine`,{
                schedule: dayList,
                uuid: curRoutineUUID
            })
            setEdit(true)
        }catch{
            console.log('balls')
        }
    }

    const value = {repRange, setRepRange, open, setOpen, HandleSubmit, dayList, setDayList, currentDay,
                   setCurrentDay, number, setNumber, handleAddExercise, page, setPage, sizzle, submit, setSubmit,
                   metaData, exercises, setExercises, input, setInput, mechanic, setMechanic, equipment, setEquipment,
                   category, setCategory, level, setLevel, primaryMuscles, setPrimaryMuscles, sets, setSets,
                   summary, setSummary, startingWeight, setStartingWeight, open2, setOpen2, handleExpandExercise, edit, setEdit,
                   exerciseId, setExerciseId, HandleUpdate, handleEdit }

    return(
        <>
        <MyContext.Provider value={value}>
            <Grid2 container spacing={2}>
                <Grid2
                size={3}
                >
                    <Paper sx={{
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
                }}>
                        <Button onClick={submitRoutine}>Submit Routine</Button>
                        <ExerciseFilters></ExerciseFilters>
                    </Paper>
                </Grid2>
                <Grid2
                size={3}
                >
                    <Paper sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: '1em',
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
                }}>
                        <ExerciseList></ExerciseList>
                    </Paper>
                </Grid2>
                <Grid2
                size={6}
                >
                    <Paper sx={{
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
                }}>
                    <RoutineList></RoutineList>
                    </Paper>
                </Grid2>
            </Grid2>
            <ExerciseModal exercise={exercise}></ExerciseModal>
            <ExerciseExpandedView exercise={exercise}></ExerciseExpandedView>

        </MyContext.Provider>
        </>
    )
}

export default ExerciseSearch