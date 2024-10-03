import RegularList from "./layouts/RegularList";
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField,Autocomplete,Checkbox, Button, FormControlLabel} from '@mui/material'
import { MyContext} from '../MyContext'
import RadioFilterGroups from "./RadioFilterGroups";

const ExerciseFilters = () =>{

    const {submit, setSubmit, metaData, input, setInput, mechanic, setMechanic, equipment, setEquipment, category, setCategory, level, setLevel, primaryMuscles, setPrimaryMuscles} = useContext(MyContext)
    const levels = ['beginner', 'intermediate', 'expert']

    const handleSumbisson = () =>{
        let newSubmission = !submit
        setSubmit(newSubmission)
    }

    const handleInput = (event) =>{
        setInput(event.target.value)
    }

    const handleRadioGroup = (event, value, setValue) =>{
        let newValue = value
        if(newValue.indexOf(event.target.name) != -1){
            newValue = newValue.filter(val =>{
                return  val !== event.target.name
            })
            setValue(newValue)
        }else{
            newValue.push(event.target.name)
            setValue(newValue)
        }
    }
    return(
        <>
            <TextField
            value={input}
            label={'Name'}
            onChange={handleInput}/>
            <Button onClick={handleSumbisson}>SUBMIT</Button>

            <br></br>
            <br></br>



            <RadioFilterGroups data={metaData} groupValue={primaryMuscles} setValue = {setPrimaryMuscles} handleData={handleRadioGroup} dataList = {'primaryMuscleList'}/>

            <br></br>
            <br></br>

            <RadioFilterGroups data={metaData} groupValue={equipment} setValue = {setEquipment} handleData={handleRadioGroup} dataList = {'equipmentList'}/>


            <br></br>
            <br></br>
          
             {levels.map(value =>{
                return (            
                <FormControlLabel sx={{marginTop: "-20px" }}
                    control={         
                        <Checkbox
                        name={value}
                        onChange={(event) =>{
                            handleRadioGroup(event, level, setLevel )
                        }}
                        ></Checkbox>
                        }
                    label={value}
                    />
                )
            })}

            <br></br>
            <br></br>

            <RadioFilterGroups data={metaData} groupValue={category} setValue = {setCategory} handleData={handleRadioGroup} dataList = {'categoryList'}/>

            <br></br>
            <br></br>


            <RadioFilterGroups data={metaData} groupValue={mechanic} setValue = {setMechanic} handleData={handleRadioGroup} dataList = {'mechanicList'}/>

        </>

    )
}

export default ExerciseFilters;