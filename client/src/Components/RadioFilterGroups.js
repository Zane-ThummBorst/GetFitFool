import RegularList from "./layouts/RegularList";
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import {TextField,Autocomplete,Checkbox, Button, FormControlLabel} from '@mui/material'
import { MyContext} from '../MyContext'

const RadioFilterGroups = ({data, handleData, dataList, groupValue, setValue}) =>{

    return(
        <>
            {Object.keys(data).length === 0 ? (
            <div>Loading...</div> // Or any loading indicator you prefer
            ) : (
            data[dataList].map(value =>{
                return (            
                <FormControlLabel sx={{mt: -2 }}
                    control={         
                        <Checkbox
                        name={value}
                        onChange={(event) =>{
                            handleData(event,groupValue, setValue)
                        }}
                        ></Checkbox>
                        }
                    label={value}
                    />
                )
            })
            )}
        </>
    )
}

export default RadioFilterGroups