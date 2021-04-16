import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { AccountCircle, ChevronRight, LocationOn } from "@material-ui/icons";
import ReactRoundedImage from 'react-rounded-image'
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import deliveryBoyAvatar from '../../img/deliveryBoyAvatar.svg'

const useStyles=makeStyles({

    root:{
        margin:theme.spacing(1,0,1),
        padding:theme.spacing(2,2,2),
        background:theme.palette.background.paper
    },
    itemRoot:{
        borderRadius:10,
        padding:theme.spacing(2,2,2),
        margin:theme.spacing(2,2,2)
    },
    title:{
        fontWeight:800,
        margin:(props) => props.mobile ?theme.spacing(2,0,2): theme.spacing(2,0,3),
        padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
    },
    itemTitle:{
        fontWeight:600,
    },
    itemOrderedDate:{
        color:theme.palette.text.hint,
        marginLeft:theme.spacing(1)
    },
    itemOrderedStatus:{
        // color:theme.palette.text.hint,
        margin:theme.spacing(2,1,0)

    },
    itemExpectedDelivery:{
        // color:theme.palette.text.hint,
        margin:theme.spacing(0,1,0)
    },
    deliveryPersonDetails:{
        margin:theme.spacing(2,1,2)
    },
    deliveryPersonContact:{
        margin:theme.spacing(0,1,0)
    }

})

const PendingOrders= () =>{
    const screen = UseWindowDimensions().screen;
    const mobile= screen==='xs'
    const sm= screen==='sm'
    const classes= useStyles({mobile:mobile, sm:sm});
    const orders = [1,2,3,4];

    return (
        <div className={classes.root}>
            <Typography variant={mobile?'h6':'h5'} align="left" className={classes.title}>
                PENDING ORDERS
            </Typography>
            <Grid  container direction='row'>
                {orders.map(()=>(
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <Paper elevation={3} className={classes.itemRoot}>
                            <Grid container direction='column' >
                                <Typography variant='h6' align='left' className={classes.itemTitle}>Lifeboy Soap + 3 more items</Typography>
                                <Typography align='left' className={classes.itemOrderedDate}>Ordered on : 23rd April, 2021</Typography>
                                <Typography align='left' className={classes.itemOrderedStatus}>Order Status : In Transit</Typography>
                                <Typography align='left' className={classes.itemExpectedDelivery}>Expected Delivery: 24th April, 2021</Typography>
                                <Grid className={classes.deliveryPersonDetails} container direction='row' alignItems='center'>
                                    <ReactRoundedImage
                                        image={deliveryBoyAvatar}
                                        imageWidth='40'
                                        imageHeight='40'
                                        roundedSize={1}
                                    >
                                    </ReactRoundedImage>
                                    <Grid item>
                                        <Grid container direction='column' className={classes.deliveryPersonContact}>
                                            <Typography className={classes.DeliveryBoyName}>Ramesh Pawar</Typography>
                                            <Typography className={classes.DeliveryBoyMobile}>+919567289930</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Button variant='outlined' color='secondary' fullWidth endIcon={<LocationOn></LocationOn>}>Track Order</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </div>
    )
    
}
export default PendingOrders;