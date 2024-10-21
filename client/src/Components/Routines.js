
import { Grid2 } from "@mui/material"
import CreateRoutine from "./CreateRoutine"
import PersonalRoutines from "./PersonalRoutines"
import { useState, useContext } from "react"
import { MyContext } from "../MyContext"

const Routines = () =>{

    const {userInfo, setUserInfo, curRoutineUUID, setCurRoutineUUID, setCurSechdule} = useContext(MyContext)
    const [routineIdList, setRoutineIdList] = useState(userInfo.personal_routines || [])
    const [routines, setRoutines] = useState([])

    const context = {userInfo, setUserInfo,curRoutineUUID, setCurRoutineUUID, setCurSechdule, routineIdList, setRoutineIdList, routines, setRoutines}
    return(
        <>
        <MyContext.Provider value = {context}>
        <Grid2 container spacing={2} columns={12}>
            <Grid2 size={4}>
                <CreateRoutine></CreateRoutine>
            </Grid2>
            <Grid2 size={8}>
                <PersonalRoutines></PersonalRoutines>
            </Grid2>
        </Grid2>
        </MyContext.Provider>
        
        </>
    )
}

export default Routines