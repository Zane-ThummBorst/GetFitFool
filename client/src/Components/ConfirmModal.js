
import { useEffect,useState, useContext } from "react";
import {Button, Modal, Typography, Box} from '@mui/material'
import { MyContext } from "../MyContext";
import axios from "axios";

const ConfirmModal = ({message}) =>{

    const {open, setOpen, curRoutineUUID, userInfo, routineIdList, setRoutineIdList} = useContext(MyContext)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const handleClose = () =>{
        setOpen(false)
    }

    const handleConfirm = async() =>{
        try{
            let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/deleteRoutine`, {uuid: curRoutineUUID})
            let newRoutineList = routineIdList.filter((id) =>{
                return id !== curRoutineUUID
            })

            setRoutineIdList(newRoutineList)


            handleClose()
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
            <Modal  
            open ={open}
            onClose={handleClose}>
                <Box sx={style}>
                    <Typography>Are You Sure?</Typography>
                    <Typography>{message}</Typography>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </Box>
            </Modal>
        </>
    )
}


export default ConfirmModal;