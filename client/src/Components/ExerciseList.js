import RegularList from "./layouts/RegularList";
import ExerciseItem from "./ExerciseItem";
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField, Button, Pagination} from '@mui/material'
import { MyContext } from '../MyContext'

const ExerciseList = () =>{

    const {page,setPage, exercises, setExercises, sizzle} = useContext(MyContext)


    const handleChange = (event,value) =>{
        setPage(value)
    }

    return(
        <>
            <RegularList items = {exercises  ? exercises: []} resourceName = {"exercises"} itemComponent = {ExerciseItem}/>
            <Pagination
            count={Math.ceil(sizzle/20)-1}
            page={page}
            onChange={handleChange}
            ></Pagination>
        </>
    )
}

export default ExerciseList