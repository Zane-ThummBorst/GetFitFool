import { useNavigate } from "react-router-dom"
import {Button} from '@mui/material'
import { useContext } from "react"
import { MyContext } from "../MyContext"

const NavBar = () =>{

    const {userInfo, setUserInfo} = useContext(MyContext)
    const navigate = useNavigate()

    const loggedIn = () =>{
      if(Object.keys(userInfo).length === 0)
        return <Button onClick={() => navigate('/Login')}>Login</Button>
      else
        return <Button onClick={() => {
          localStorage.clear()
          setUserInfo({})
          navigate('/Login')
        }}>Logout</Button>
    }

    return(
        <>
          <Button onClick={() => navigate('/Register')}>Register</Button>
          {loggedIn()}
          <Button disabled={Object.keys(userInfo).length === 0} onClick={() => navigate('/UpdateInfo')}>Update Info</Button>
          <Button onClick={() => navigate('/Routines')}>Routines</Button>
          <Button onClick={() => navigate('/Public Routines')}>Public Routines</Button>
        </>
    )
}

export default NavBar