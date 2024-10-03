import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField, Button} from '@mui/material'
import { MyContext } from '../MyContext'

const ExercisePage = () =>{
    const temp = 'Alternating Renegade Row'
    const [exercise, setExercise] =  useState({})

    useEffect( () =>{
        const getExercise = async() =>{
            axios.post(`${process.env.REACT_APP_API_URL}/exercises/getExercise`,{
                name: temp
            })
            .then(response =>{
                setExercise(response.data)
                console.log(response.data.primaryMuscles[0])
            })
            .catch(error =>{
                alert("balls")
            })
        }
        getExercise()
    }, [])
    


    return(
        <>
            <img src = {exercise.images ? exercise.images[1] : ''}></img>
            <p>{exercise.name}</p>
            <p>{exercise.force}</p>
            <p>{exercise.level}</p>
            <p>{exercise.equipment}</p>
            <p>{exercise.category}</p>
            <h1>Primary Muscles:</h1>
            <ul>
                {exercise.primaryMuscles ? exercise.primaryMuscles.map(value => { return <li>{value}</li> }): 0} 
            </ul>
            <h1>Secondary Muscles:</h1>
            <ul>
                {exercise.secondaryMuscles ? exercise.secondaryMuscles.map(value => { return <li>{value}</li> }): 0} 
            </ul>
            <h1>Instructions:</h1>
            <ul>
                {exercise.instructions ? exercise.instructions.map(value => { return <li>{value}</li> }): 0} 
            </ul>
        </>
    )
}

export default ExercisePage