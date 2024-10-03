import { useState, useEffect, useContext } from "react";
import { MyContext } from "../MyContext";
import { Button, Paper, Grid2, Typography} from "@mui/material";
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
  fontWeight: 600,
}

let typoStyle2 = {
  width:'300px',
  fontWeight: 600, 
}

const DayInfoLabels = () => {

  return (
    <>
        <Grid2 sx={style} alignItems={'flex-end'}>
          <Typography sx={typoStyle2} variant="p" >
            EXERCISE
          </Typography>
          <Typography sx={typoStyle} variant="p" >
            SETS
          </Typography>
          <Typography sx={typoStyle} variant="p" >
            STARTING WEIGHT
          </Typography>
          <Typography sx={typoStyle} variant="p" >
            REP RANGE
          </Typography>
          <Button disabled
              >
                
            </Button>
        </Grid2>
    </>
  );
};

export default DayInfoLabels;