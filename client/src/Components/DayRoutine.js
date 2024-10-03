import { useState, useEffect, useContext } from "react";
import { Button, Box, Paper } from "@mui/material";
import DayInfo from "./DayInfo";
import { MyContext } from "../MyContext";
import DayInfoLabels from "./DayInfoLabels";

const DayRoutine = ({ day }) => {
  const { dayList } = useContext(MyContext);


  return (
    <>
      {dayList[day].exercises.map((e, index) => {
        return (
          <>
          <Paper elevation={6} sx={{margin:'1em', padding: '1em'}} justifyContent={'center'}>
              <DayInfo key={e.id} info={e.info} day={day} id={e.id}/>
            </Paper>
          </>
        );
      })}
    </>
  );
};

export default DayRoutine;
