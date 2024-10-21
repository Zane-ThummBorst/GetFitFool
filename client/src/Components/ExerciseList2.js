
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import RegularList from "./layouts/RegularList"
import { Pagination, Box, TextField } from "@mui/material"
import ExerciseItem2 from "./ExerciseItem2"


const ExerciseList2 = () =>{

    const [exercises, setExercises] = useState(null)
    const [input, setInput] = useState('')
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [submit, setSubmit] = useState(false)

    const style = {
        display: "flex",
        flexDirection: "row",
        mt:5, // Change from column to row
        borderRadius: '1em',
        overflowX: "auto", // Enable horizontal scrolling
        scrollbarWidth: "none", // Hide the scrollbar for firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
        },
        '&::-moz-scrollbar': { // Add this for Firefox
          display: 'none'
        },
        '&::-ms-overflow-style': { // Add this for Internet Explorer
          display: 'none'
        },
        maxWidth: {
          xs: '50px',
          sm: '100px',
          md: '200px',
          lg: '300px',
          xl: '470px',
        },
      };


      const handleInput = (event) =>{
        setInput(event.target.value)
      }

    useEffect(() =>{
        const getExercises = async() =>{
            try{
                let payload = {limit:20, offset: (page-1)*20}

                if(input !== '')
                    payload.input = input

                let result = await axios.post(`${process.env.REACT_APP_API_URL}/exercises/getManyExercises`, payload)
                setExercises(result.data.result)
                setCount(result.data.size)
                console.log(result.data)
            }catch(e){

            }
        } 
        getExercises()

    },[page, input])


    const handleChange = (event,value) =>{
        setPage(value)
    }

    return(
        <>

            <Box sx={{width: '400px'}} display={'flex'} justifyContent={'space-between'}>
            <TextField onChange={handleInput} value={input} label={`Exercise Name`}></TextField>
            </Box>
            <Box sx ={style}>
                <RegularList items = {exercises  ? exercises: []} resourceName = {"exercises"} itemComponent = {ExerciseItem2}/>
            </Box>
            <Pagination
            count={Math.ceil(count/20)-1}
            page={page}
            onChange={handleChange}
            sx={{mt: 3}}
            ></Pagination>
        </>
    )
}

export default ExerciseList2