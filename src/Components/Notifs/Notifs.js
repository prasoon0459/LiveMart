import { CardActionArea, Divider, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { NotificationsActiveSharp } from "@material-ui/icons"
import theme from "../../theme"
import UseWindowDimensions from '../../utils/UseWindowDimensions'

const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile ? theme.spacing(0, 1, 0) : theme.spacing(0, 2, 0)
    },
    notifPaper: {
        width: '100%',
        maxWidth: '992px',
        margin: (props) => props.mobile ? theme.spacing(1, 0, 1) : theme.spacing(2, 0, 2)
    },
    title: {
        margin: theme.spacing(1, 2, 1)
    },
    notifcontainer: {
        padding: theme.spacing(2, 2, 2)
    },
    contentSeen: {
        color: theme.palette.text.seen
    },
    dateSeen: {
        margin: theme.spacing(1, 0, 0),
        color: theme.palette.text.seen
    },
    contentUnseen: {
        fontWeight: 500,
        color: theme.palette.text.primary
    },
    dateUnseen: {
        margin: theme.spacing(1, 0, 0),
        color: theme.palette.text.secondary
    },
    viewAllBtn: {
    }
})

const Notifs = () => {


    const notifs = [1, 2, 3, 4, 5, 6, 7, 8]
    const mobile = UseWindowDimensions().mobile

    const classes = useStyles({ mobile: mobile })

    return (
        <Grid container direction='column' className={classes.root} alignItems='center' >
            <Grid container direction='row' justify='center' alignItems='center'>
                <NotificationsActiveSharp></NotificationsActiveSharp>
                <Typography variant={mobile ? 'h6' : 'h5'} align="left" className={classes.title}>
                    Notifications
                </Typography>
            </Grid>
            <Divider></Divider>
            {notifs.map((notif) => (
                <Paper className={classes.notifPaper}>
                    <CardActionArea>
                        <Grid container direction='column' className={classes.notifcontainer}>
                            <Grid container direction='row-reverse' alignItems='flex-start'>
                                <Grid container direction='column'>
                                    <Typography align='left' variant='body2' className={notif < 3 ? classes.contentUnseen : classes.contentSeen}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec venenatis ex. Quisque tristique pellentesque sapien sed pulvinar. Pellentesque nec dui eu velit volutpat sollicitudin quis a nisl. </Typography>
                                    <Typography align='left' variant='subtitle2' className={notif < 3 ? classes.dateUnseen : classes.dateSeen}>08th April 2021, 07:20 PM</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Paper>
            ))}
        </Grid>
    )
}

export default Notifs