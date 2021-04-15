import { Button, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { FiberManualRecord } from "@material-ui/icons"
import theme from "../../theme"

const useStyles=makeStyles({
    notifPaper:{
        width:'500px',
        padding:theme.spacing(2,2,2)
    },
    divider:{
        margin:theme.spacing(2,0,2)
    },
    contentSeen:{
        color:theme.palette.text.seen
    },
    dateSeen:{
        margin:theme.spacing(1,0,0),    
        color:theme.palette.text.seen
    },
    contentUnseen:{
        fontWeight:500,
        color:theme.palette.text.primary
    },
    dateUnseen:{
        margin:theme.spacing(1,0,0),    
        color:theme.palette.text.secondary
    },
    viewAllBtn:{
    }
})

const Notifs = () =>{

    const classes = useStyles()

    const notifs = [1,2,3,4,]

    return (
        <Paper className={classes.notifPaper}>
            {notifs.map((notif)=>(
                <div>
                    <Button>
                        <Grid container direction='row-reverse' alignItems='flex-start'>
                            <FiberManualRecord></FiberManualRecord>
                            <Grid container direction='column'> 
                                <Typography align='left' variant='body2' className={notif<3?classes.contentUnseen:classes.contentSeen}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis ex. Quisque tristique pellentesque sapien sed pulvinar. Pellentesque nec dui eu velit volutpat sollicitudin quis a nisl. Donec maximus non massa in tincidunt.</Typography>
                                <Typography align='left' variant='subtitle2' className={notif<3?classes.dateUnseen:classes.dateSeen}>08th April 2021, 07:20 PM</Typography>
                            </Grid>
                        </Grid>
                    </Button>                    
                    <Divider className={classes.divider}></Divider>
                </div>
            ))}
            <Button  className={classes.viewAllBtn} color='secondary'>
                View All
            </Button>
        </Paper>
    )
}

export default Notifs