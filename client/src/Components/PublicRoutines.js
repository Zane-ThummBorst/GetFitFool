import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { MyContext } from "../MyContext"
import {Button, Box, Typography, Grid2, Paper, Pagination, IconButton} from '@mui/material'
import CenteredLayout from "./layouts/CenteredLayout"
import PublicRoutinesList from "./PublicRoutinesList"
import PublicRoutineFilters from "./PublicRoutineFilters"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const PublicRoutines = () =>{
    const {userInfo, setUserInfo} = useContext(MyContext)

    const [filterSubmission, setFilterSumbisson] = useState(false)
    const [publicRoutines, setPublicRoutines] = useState([])
    const [totalRoutines, setTotalRoutines] = useState(1)
    const [page, setPage] = useState(1)
    const [numberOfDays, setNumberOfDays] = useState(null)
    const [numberOfExercises, setNumberOfExercises] = useState([0,50])
    const [sortField, setSortField] = useState(null)
    const [sortType, setSortType] = useState(null)
    const [open, setOpen] = useState(false)
    const [exercises, setExercises] = useState([])
    const [likedRoutines, setLikedRoutines] = useState(userInfo.liked_routines || [])

    useEffect(() =>{
        const getPublicRoutines = async() =>{
            try{
                let payload = {offset: (page-1)*20}

                if(numberOfDays > 0){
                    payload.numberOfDays = parseInt(numberOfDays)
                }

                if (numberOfExercises[0] >= 0){
                    payload.totalExercisesRange = numberOfExercises
                }

                if(sortField != null){
                    payload.sortField = sortField
                    payload.sortOrder = sortType
                }

                if (exercises.length !== 0)
                    payload.exerciseList = exercises
                
                let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/getPublicRoutines`, payload)

                setPublicRoutines(result.data.publicRoutines)
                setTotalRoutines(result.data.count)
            }catch(e){
                console.log(e)
            }
        }

        getPublicRoutines()
    },[page, filterSubmission, sortField, sortType])


    const applyFilters = () =>{
        let newFilterSubmission = filterSubmission
        setFilterSumbisson(!newFilterSubmission)
    }

    const handleDrawer = () =>{
        setOpen(true)
    }

    const handleAddExercise = (exercise) =>{
        if(exercises.indexOf(exercise) === -1)
            setExercises([...exercises, exercise])
    }

    const context = {publicRoutines, setPublicRoutines, totalRoutines, setTotalRoutines, page, setPage,
        numberOfDays, setNumberOfDays, applyFilters,numberOfExercises, setNumberOfExercises, sortField, setSortField,
        sortType, setSortType, open, setOpen, handleAddExercise, exercises, setExercises, userInfo, likedRoutines, setLikedRoutines,
        setUserInfo
     }

    return(
        <>
        <MyContext.Provider value = {context}>
            <PublicRoutineFilters/>
            <IconButton onClick={handleDrawer}><ArrowForwardIosIcon/></IconButton>
            <PublicRoutinesList/>
        </MyContext.Provider>
        </>
    )
}

export default PublicRoutines