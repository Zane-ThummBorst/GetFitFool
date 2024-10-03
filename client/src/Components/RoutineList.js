import { useContext, useState } from "react";
import { MyContext } from "../MyContext";
import { Button, ButtonGroup, Grid2, Box, Paper } from "@mui/material";
import DayRoutine from "./DayRoutine";
import DayInfoLabels from "./DayInfoLabels";

const RoutineList = () => {

  const {dayList, setDayList,currentDay, setCurrentDay, HandleSubmit,handleEdit } = useContext(MyContext)
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const handleDay = (event) => {
    setCurrentDay(event.currentTarget.value);

  };


  const handleDelete = (day, id) => {
    setDayList({
      ...dayList,
      [day]: {exercises: dayList[day].exercises.filter((element) => {
        return element.id !== id;
      }),
      notes: ''}
    });
  };

  return (
    <>
      <Box sx={{display:'flex', justifyContent: 'center'}}>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        
        {days.map( (day) =>{
          return(
            <Button variant={day === currentDay ? "contained" : "outlined"}
             value={day} onClick={handleDay}>{day}</Button>
          )
        })}
      </ButtonGroup>
      </Box>
      <MyContext.Provider value={{ HandleSubmit, dayList, handleDelete, handleEdit }}>
        <Grid2 container spacing={4} columns={6} >
          {Object.keys(dayList).map((e) => {
            return (
              currentDay == e && (
                <Grid2 size={6}>
                   <Paper elevation={0} sx={{margin:'1em', padding: '1em'}} justifyContent={'center'}>
                    <DayInfoLabels></DayInfoLabels>
                    </Paper>
                  <DayRoutine day={e}></DayRoutine>
                </Grid2>
              )
            );
          })}
        </Grid2>
      </MyContext.Provider>
    </>
  );
};

export default RoutineList;
