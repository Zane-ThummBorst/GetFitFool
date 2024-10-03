import { useNavigate } from "react-router-dom"
import {Button} from '@mui/material'

const NavBar = () =>{

    const navigate = useNavigate()

    return(
        <>
          <Button onClick={() => navigate('/')}>Exercise Search</Button>
          <Button onClick={() => navigate('/Register')}>Register</Button>
          <Button onClick={() => navigate('/Login')}>Login</Button>
          <Button onClick={() => navigate('/UpdateInfo')}>Update Info</Button>
          <Button onClick={() => navigate('/CreateRoutine')}>Create Routine</Button>
          <Button onClick={() => navigate('/PersonalRoutine')}>Personal Routine</Button>

        </>
    )
}

export default NavBar