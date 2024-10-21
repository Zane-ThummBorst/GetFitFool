import { useContext } from "react"
import { MyContext } from "../MyContext"
import { Modal,Box,Typography,Button } from "@mui/material"
import axios from "axios";

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


const PublicModal = ({message}) =>{
    const {open2, setOpen2, curRoutineUUID, userInfo} = useContext(MyContext)

    const makePublic = async() =>{
        try{
            console.log(curRoutineUUID)
            let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/cloneRoutine`,{
                newOwner: userInfo.user_id,
                routineUuid: curRoutineUUID,
                isPublic: true
            })
            handleClose()
        }catch{
            console.log('error')
        }
    }

    const handleClose = () =>{
        setOpen2(false)
    }

    return(
        <>
        <Modal
        open={open2}
        onClose={handleClose}>
            <Box sx={style}>
                <Typography>Are You Sure?</Typography>
                <Typography>{message}</Typography>
                <Button onClick={makePublic}>Make Public</Button>
            </Box>
        </Modal>
        </>
    )
}

export default PublicModal