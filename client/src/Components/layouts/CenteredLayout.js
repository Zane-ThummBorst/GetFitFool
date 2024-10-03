import { Grid, Grid2 } from "@mui/material";

const style = {
    mt: 15
}

const CenteredLayout = ({children, size}) =>{
    return (
        <>
            <Grid2 sx ={style} container spacing={2} columns={12}>
                <Grid2  size={3}/>
                <Grid2 size= {6}>
                    {children}
                </Grid2>
                <Grid2 size={3}/>
            </Grid2>
        </>
    )
}

export default CenteredLayout