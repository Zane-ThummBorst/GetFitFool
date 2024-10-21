import { useState, useEffect, useContext } from "react"
import { Button, IconButton} from "@mui/material"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { MyContext } from "../MyContext";

const RoutineLikedButton = ({routineId, initialState}) =>{
    const {handleLike, handleUnlike} = useContext(MyContext)
    const [liked, setLiked] = useState(initialState)

    const handleClick = () =>{
        liked ? handleUnlike(routineId) : handleLike(routineId)
        setLiked(current => !current)
    }


    return(
        <>
        <IconButton onClick={handleClick}>
            {liked ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>}
        </IconButton>
        </>
    )
}

export default RoutineLikedButton