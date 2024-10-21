import { Grid, Grid2 } from "@mui/material";

const style = {
    mt: 3
}

const CenteredLayout = ({children, size}) =>{
    return (
        <>
            <Grid2 sx ={style} container spacing={2} columns={12}>
                <Grid2  size={(12-size)/2}/>
                <Grid2 size= {size}>
                    {children}
                </Grid2>
                <Grid2 size={(12-size)/2}/>
            </Grid2>
        </>
    )
}

export default CenteredLayout