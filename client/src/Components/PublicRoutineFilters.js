import { useState, useEffect, useContext } from "react"
import { Grid2,Button,TextField,Typography, Paper, Slider, Box, ButtonGroup, Drawer, IconButton } from "@mui/material"
import { MyContext } from "../MyContext"
import CenteredLayout from "./layouts/CenteredLayout"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExerciseList2 from "./ExerciseList2";
import ChipList from "./ChipList";



const PublicRoutineFilters = () =>{

    const {numberOfDays, setNumberOfDays, applyFilters, numberOfExercises, setNumberOfExercises, sortField, setSortField,
        sortType, setSortType, open, setOpen, handleAddExercise, exercises, setExercises} = useContext(MyContext)

    const drawerWidth = 500;

    const drawerStyle = {
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          scrollbarWidth: "none", // Hide the scrollbar for firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
          },
          '&::-moz-scrollbar': { // Add this for Firefox
            display: 'none',
          },
          '&::-ms-overflow-style': { // Add this for IE
            display: 'none',
          },
          maxHeight: '100%'
        },
      };
    const handleClose = () =>{
        setOpen(false)
    }

    const handleChange = (event, setFunction) =>{
        console.log(typeof event.target.value)
        setFunction(event.target.value)
    }

    const handleSort = (event) =>{
        console.log(event.currentTarget.value)
        if(event.currentTarget.value === sortField){
            switch(sortType){
                case 1:
                    setSortType(-1)
                    break
                case -1:
                    setSortType(null)
                    setSortField(null)
                    break
            }
        }else{
            setSortField(event.currentTarget.value)
            setSortType(1)
        }

    }

    return(
        <>
        <Drawer
          sx={drawerStyle}
          variant="persistent"
          anchor="left"
          open={open}>  

            <Box position={'sticky'} sx={{ background: "grey", display: "flex", justifyContent: "space-between", top:0, zIndex: 1, mt:3}}>
                <Button variant="outlined" onClick={applyFilters}>Apply Filters</Button>
                <IconButton onClick={handleClose}>
                    <ArrowBackIosNewIcon/>
                </IconButton>
            </Box>          

            <Paper sx={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
            <Typography variant="h5" sx={{width: '400px',  mt:3}} display={'flex'} justifyContent={'space-between'}>Number of Exercises:</Typography>
                <Box sx={{width: '400px', mt:5}} display={'flex'} justifyContent={'space-between'}>
                    <Slider
                    value={numberOfExercises}
                    onChange={(event) =>{handleChange(event, setNumberOfExercises)}}
                        valueLabelDisplay="on"
                        max={50}
                    />
                </Box>
                <Box sx={{width: '400px', mt:5}} display={'flex'} justifyContent={'space-between'}>
                    <TextField
                        type="number"
                        label="Number of Days"
                        value={numberOfDays}
                        onChange={(event) =>{handleChange(event,setNumberOfDays)}}
                        />
                </Box>

                {/* <ButtonGroup sx={{mt:10}}>
                    <Button onClick={handleSort} value='totalExercises'>Total Exercises</Button>
                    <Button onClick={handleSort} value='likes'>Likes</Button>
                    <Button onClick={handleSort} value='clones'>clones</Button>
                    <Button onClick={handleSort} value='name'>name</Button>
                </ButtonGroup> */}
                <MyContext.Provider value={{handleAddExercise}}>
                        <ExerciseList2/>
                </MyContext.Provider>

                <MyContext.Provider value={{exercises, setExercises}}>
                    <ChipList></ChipList>
                </MyContext.Provider>

            </Paper>
        </Drawer>
        
        </>
    )
}

export default PublicRoutineFilters