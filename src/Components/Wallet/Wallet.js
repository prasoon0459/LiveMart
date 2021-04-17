import { Divider, Grid, makeStyles, Paper, Typography, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import { StoreOutlined } from "@material-ui/icons";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 3, 1),
    },
    ordersContainer: {
        padding: (props) => props.sm || props.mobile ? theme.spacing(2, 0, 0) : theme.spacing(4, 5, 0),
    },
    orderPaper: {
        margin: theme.spacing(1, 1, 1),
        padding: theme.spacing(2, 2, 2),
        maxWidth: '992px'
    },
    orderItems: {
        margin: theme.spacing(2, 2, 2)
    },
    storeIcon: {
        margin: theme.spacing(1, 1, 0)
    },
    orderStatus: {
        fontSize: 18,
        letterSpacing: 1,
        margin: theme.spacing(1, 0, 1)
    },
    orderStatusItem: {
        flexGrow: 1,
    },
    orderStoreName: {
        fontSize: 15,
        letterSpacing: 1,
        fontWeight: 100,
        padding: theme.spacing(1, 0, 0, 0)
    },
    orderDeliveryDate: {
        fontSize: 18,
        letterSpacing: 1,
        fontWeight: 600,
        margin: theme.spacing(0, 1, 1)
    },
    orderTotalPrice: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 500,
        color: 'red',
        margin: theme.spacing(1, 0, 1)
    },
    title: {
        fontWeight: 500,
        letterSpacing: 2,
        margin: (props) => props.mobile ? theme.spacing(2, 1, 2) : theme.spacing(2, 2, 1),
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
    },
    list: {
        padding: theme.spacing(0)
    },
    id: {
        textAlign: 'right'
    },
    cont: {
        maxWidth: (props) => props.mobile ? '8%' : '5%',
    },
})

const Wallet = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });

    const orders = [1, 1, 1, 1, 1, 1]

    return (
        <div className={classes.root}>
            <Grid container direction="column" className={classes.root}>
                <Typography variant={mobile ? 'h6' : 'h5'} align="left" className={classes.title}>
                    Wallet History
                </Typography>
                <Divider></Divider>
                <Grid container direction='column' className={classes.ordersContainer}>
                    {orders.map((order) => (
                        <Grid item width='100%'>
                            <Paper className={classes.orderPaper}>
                                <Grid container alignItems='center' direction='row'>
                                    <Grid item className={classes.orderStatusItem}>
                                        <Typography className={classes.orderStatus} align='left'>Paid via LiveMart Wallet </Typography>
                                    </Grid>
                                    <Typography className={classes.orderTotalPrice} align='right'>-$320.78</Typography>                                </Grid>
                                <Grid container direction='row' width='100%'>
                                    <StoreOutlined className={classes.storeIcon}></StoreOutlined>
                                    <Grid item><Typography className={classes.orderStoreName}>M/s Agarwal General Store</Typography></Grid>
                                </Grid>
                                <Grid container className={classes.orderItems} direction='column'>
                                </Grid>
                                {/* <Grid container direction='row' justify='flex-start' alignItems='center' spacing={1}> */}
                                <List >
                                    <ListItem className={classes.list}>
                                        <Grid container alignItems='center'>
                                            <Grid item className={classes.cont} xs={1}>
                                                <ListItemIcon>
                                                    <CheckCircleOutlineIcon htmlColor='#32CD32' />
                                                </ListItemIcon>
                                            </Grid>
                                            <Grid item xs={11} sm={6}>
                                                <ListItemText primary="Payment Successfull" secondary="Date: 16/04/2021" />
                                            </Grid>
                                            <Grid item xs={12} sm={5}>
                                                <Typography className={classes.id} align='right'>Transaction-ID:180129423</Typography>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                                {/* <Grid item xs={1} sm={1}>
                                        
                                    </Grid> */}
                                {/* <Grid item xs={11} sm={11}>
                                        <Typography variant="overline" display="block" align='left'>Payment Successfull</Typography>
                                        <Typography variant="caption" display="block" gutterBottom align='left'>Date: 16/04/2021</Typography>
                                    </Grid> */}
                                {/* </Grid> */}

                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
    )

}

export default Wallet;