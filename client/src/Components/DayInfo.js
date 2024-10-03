import { useState, useEffect, useContext } from "react";
import { MyContext } from "../MyContext";
import { Button, ButtonGroup, Paper, Grid2, Typography} from "@mui/material";
let style = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  '.MuiTypography-h4': {
    maxWidth: '15px', // Adjust this value as needed
  },
};

let typoStyle = {
  width:'100px', 
}

let typoStyle2 = {
  width:'300px', 
}

const DayInfo = ({ id, info, day, }) => {

  const {handleDelete, setEdit, setExerciseId, setExercise, handleEdit} = useContext(MyContext)


  return (
    <>
        <Grid2 sx={style} alignItems={'center'}>
        <Typography sx={typoStyle2} variant="p" >
          {info.name}
        </Typography>
        <Typography sx={typoStyle} variant="p" >
          {info.number_of_sets} sets
        </Typography>
        <Typography sx={typoStyle} variant="p" >
          {info.starting_weight} lbs
        </Typography>
        <Typography sx={typoStyle} variant="p" >
          {info.rep_range[0]} - {info.rep_range[1]} reps
        </Typography>
        <ButtonGroup  size="small"  orientation="vertical">
        <Button
              onClick={() => {
                handleDelete(day, id);
              }}
            >
              Del
          </Button>
          <Button
              onClick={() =>{ handleEdit(id,info)}}
            >
              Edit
          </Button>
          </ButtonGroup>
        </Grid2>
    </>
  );
};

export default DayInfo;