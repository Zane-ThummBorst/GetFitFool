import logo from './logo.svg';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MyContext } from './MyContext';
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import UpdateUserForm from './Components/UpdateUserForm';
import ExerciseSearch from './Components/ExerciseSearch';
import NavBar from './Components/NavBar';
import Routines from './Components/Routines';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PublicRoutines from './Components/PublicRoutines';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [userInfo, setUserInfo] = useState({})
  const [login, setLogin] = useState(localStorage.getItem('jwt_token') !== undefined)
  const [metaData, setMetaData] = useState({})
  const [curRoutineUUID, setCurRoutineUUID] = useState('')
  const [curSchedule, setCurSechdule] = useState({})

  useEffect(() =>{
    const getRequest = async() =>{
      await axios.post(`${process.env.REACT_APP_API_URL}/users/getUser`,{},
        {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
          },
          withCredentials: true
      }
        )
      .then(response =>{
        setUserInfo(response.data)
      })
      .catch(error =>{
        console.log(error)
        alert('internal error')
      })
    }
      
    if(localStorage.getItem('jwt_token'))
      getRequest()
  }, [login])


  useEffect(() =>{
    const request = async() =>{
      try{
        let result = await axios.get(`${process.env.REACT_APP_API_URL}/exercises/metadata`)
        setMetaData(result.data)
      }catch{
        console.log("Beef")
      }
    }
  request()
  }, [])

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
      <BrowserRouter>
        <MyContext.Provider value ={{login, setLogin, userInfo, setUserInfo, metaData,curRoutineUUID, setCurRoutineUUID, curSchedule, setCurSechdule }}>

          
          <NavBar/>

          <Routes>
              <Route path="Routine_Creation" element={<ExerciseSearch />}/>
              <Route path="Register" element={<RegistrationForm/>}/>
              <Route path = "Login" element={<LoginForm/>}/>
              <Route path = "UpdateInfo" element={<UpdateUserForm/>}/>
              <Route path="Routines" element={<Routines/>}/>
              <Route path="Public Routines" element={<PublicRoutines/>}/>
          </Routes>

        </MyContext.Provider>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
