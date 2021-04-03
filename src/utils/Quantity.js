import { Button, Container, Grid, IconButton, Input, makeStyles, Paper, Typography } from "@material-ui/core"
import { AddOutlined, AddSharp, RemoveOutlined } from "@material-ui/icons"
import theme from "../theme"

const useStyles=makeStyles({
    root:{
        margin:theme.spacing(1,1,1)
    },
    btn:{
        paddingLeft:theme.spacing(0),
        paddingRight: theme.spacing(0)
    },
    span:{
        textAlign: 'center',
        margin:theme.spacing(0,2,0)
    },
})

const Quantity = () =>{
    const classes= useStyles()
    return(
        <Grid className={classes.root} container direction='row' className={classes.root} alignItems='center'>
            <Button xs={4} className={classes.btn} variant='outlined'><AddSharp></AddSharp></Button>
            <span xs={4} className={classes.span}>3</span>
            <Button xs={4} className={classes.btn} variant='outlined' ><RemoveOutlined></RemoveOutlined></Button>
        </Grid>
    )
}

export default Quantity;