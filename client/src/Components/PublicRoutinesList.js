import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { MyContext } from "../MyContext"
import {Button, Box, Typography, Grid2, Paper, Pagination, IconButton} from '@mui/material'
import CenteredLayout from "./layouts/CenteredLayout"
import RoutineLikedButton from "./RoutineLikeButton"
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
let typoStyle = {
    width:'100px',
    cursor: 'pointer', 
  }
  
  let typoStyle2 = {
    width:'200px',
    cursor: 'pointer',  
  }

  const scrollStyle = {
    
    borderRadius: '1em',
    p: 1,
    mt:3,
    overflow: "auto",
    scrollbarWidth: "none", // Hide the scrollbar for firefox
    '&::-webkit-scrollbar': {
        display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
    '&-ms-overflow-style:': {
        display: 'none', // Hide the scrollbar for IE
    },
    maxHeight: {
        xs: '200px',
        sm: '300px',
        md: '400px',
        lg: '500px',
        xl: '600px',
      },
    }


const PublicRoutinesList = () =>{

    const {publicRoutines, setPublicRoutines, totalRoutines, setTotalRoutines, page, setPage, userInfo, setUserInfo,
        sortField, setSortField, sortType, setSortType, likedRoutines, setLikedRoutines} = useContext(MyContext)
    


    const dayList = (routine) =>{
        let result = ''
       return( Object.keys(routine.schedule).map(day =>{
            if(routine.schedule[day].exercises.length !== 0)
                return(<Typography sx={{mx:0.5}}>{day[0]+day[1]}</Typography>)
            else
                return(<Typography color="textDisabled" sx={{mx: 0.5}}>{day[0]+day[1]}</Typography>)
        }))
    }

    const handleChange = (event,value) =>{
        setPage(value)
    }

    const isLiked = (routineId) =>{
        return likedRoutines.indexOf(routineId) != -1 ? true : false
    }

    const handleLike = async(routineId) =>{
        console.log(routineId)
        setLikedRoutines([...likedRoutines, routineId])
        setUserInfo({...userInfo, liked_routines: [...likedRoutines, routineId] })
        try{
            let result = await axios.put(`${process.env.REACT_APP_API_URL}/users/LikesAndClones`,{
                routineId: routineId,
                operation: '$push',
                operationField: 'liked_routines'

            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            console.log(result)
            let result2 = await axios.post(`${process.env.REACT_APP_API_URL}/routines/increment`,{
                uuid: routineId,
                incrementField: 'likes',
                operation:1
            })
            console.log(result2)
            }catch(e){
                console.log('ass')
        }
    }

    const handleUnlike = async(routineId) =>{
        setLikedRoutines(likedRoutines.filter((uuid) =>{return uuid !== routineId}))
        setUserInfo({...userInfo, liked_routines: likedRoutines.filter((uuid) =>{return uuid !== routineId})})
        try{
            let result = await axios.put(`${process.env.REACT_APP_API_URL}/users/LikesAndClones`,{
                routineId: routineId,
                operation: '$pull',
                operationField: 'liked_routines'

            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })

            let result2 = await axios.post(`${process.env.REACT_APP_API_URL}/routines/increment`,{
                uuid: routineId,
                incrementField: 'likes',
                operation:-1
            })
            console.log(result2)
            }catch(e){
                console.log('ass')
        }
    }

    const handleClone = async(routineId) =>{
        try{
            let result = await axios.post(`${process.env.REACT_APP_API_URL}/routines/cloneRoutine`,{
                newOwner: userInfo.user_id,
                routineUuid: routineId,
                isPublic: false

            })
            console.log(result.data)
            let result2 = await axios.post(`${process.env.REACT_APP_API_URL}/routines/increment`,{
                uuid: result.data,
                incrementField: 'clones',
                operation: 1,
            })
            let result3 = await axios.put(`${process.env.REACT_APP_API_URL}/users/LikesAndClones`,{
                routineId: result.data,
                operation: '$push',
                operationField: 'personal_routines'

            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
                },
                withCredentials: true
            })
            setUserInfo({...userInfo, personal_routines: [...userInfo.personal_routines, result.data] })
            alert('cloned it fuck face')
        }catch(e){
            console.log(e)
        }
    }

    const handleSort = (value) =>{
        if(value === sortField){
            switch(sortType){
                case 1:
                    setSortType(-1)
                    break
                case -1:
                    setSortType(null)
                    setSortField(null)
                    break
            }
        }else{
            setSortField(value)
            setSortType(1)
        }

    }

    const showSort = (value) =>{
        if(value == sortField && sortType == 1)
            return <ExpandMoreIcon/>
        else if (value == sortField && sortType == -1)
            return <ExpandLessIcon/>
        else
            return
    }
    return(
        <>
        <CenteredLayout size={8}>

        <Paper  sx={{ display: "flex", justifyContent: "space-between", padding: '1em', mt: 3, alignItems: 'center' }}>
                <Typography  sx={typoStyle2} onClick={() => handleSort('name')}>NAME {showSort('name')}</Typography>
                <Typography sx={typoStyle} onClick={() => handleSort('totalExercises')}>TOTAL {showSort('totalExercises')}</Typography>
                <Typography sx={typoStyle} onClick={() => handleSort('likes')}>LIKES {showSort('likes')} </Typography>
                <Typography sx={typoStyle} onClick={() => handleSort('days')}>DAYS {showSort('days')} </Typography>
                <Typography sx={typoStyle}></Typography>
                <Typography sx={typoStyle}></Typography>
        </Paper>

        <Paper sx={scrollStyle}>
        {publicRoutines.length === 0 ? <p>Loading</p> : publicRoutines.map((routine) => (

            <Paper elevation={6} sx={{ display: "flex", justifyContent: "space-between", padding: '1em', mt: 3, alignItems: 'center' }} > 
                <Typography sx={typoStyle2}>{routine.name}</Typography>
                <Typography sx={typoStyle}>{routine.totalExercises}</Typography>
                <Typography sx={typoStyle}>{routine.likes}</Typography>
                <Typography sx={typoStyle2}><Box sx={{display:'flex'}}>{dayList(routine)}</Box></Typography>
            

                <MyContext.Provider value = {{handleLike, handleUnlike}}>
                    <RoutineLikedButton routineId={routine.uuid} initialState={isLiked(routine.uuid)}/>
                </MyContext.Provider>

                <IconButton onClick={() =>{handleClone(routine.uuid)}}>\
                    <AddToPhotosIcon/>
                    </IconButton>
            </Paper>
       
        ))}

        </Paper>
        <Pagination
            count={Math.ceil(totalRoutines/20)}
            page={page}
            onChange={handleChange}
            />
        </CenteredLayout>
        
        </>
    )
}

export default PublicRoutinesList