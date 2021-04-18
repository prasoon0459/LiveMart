import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { LocationOn } from "@material-ui/icons";
import ReactRoundedImage from 'react-rounded-image'
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import deliveryBoyAvatar from '../../img/deliveryBoyAvatar.svg'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({

    root: {
        margin: theme.spacing(1, 0, 1),
        padding: theme.spacing(2, 2, 2),
        background: theme.palette.background.paper
    },
    itemRoot: {
        borderRadius: 10,
        padding: theme.spacing(2, 2, 2),
        margin: theme.spacing(2, 2, 2)
    },
    title: {
        fontWeight: 800,
        margin: (props) => props.mobile ? theme.spacing(2, 0, 2) : theme.spacing(2, 0, 3),
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
    },
    itemTitle: {
        fontWeight: 600,
        fontSize:18
    },
    itemOrderedDate: {
        color: theme.palette.text.hint,
        marginLeft: theme.spacing(1)
    },
    itemOrderedStatus: {
        // color:theme.palette.text.hint,
        margin: theme.spacing(2, 1, 0)

    },
    itemExpectedDelivery: {
        // color:theme.palette.text.hint,
        margin: theme.spacing(0, 1, 0)
    },
    deliveryPersonDetails: {
        margin: theme.spacing(2, 1, 2)
    },
    deliveryPersonContact: {
        margin: theme.spacing(0, 1, 0)
    },
    shopName: {
        margin: theme.spacing(0, 1, 0)
    }

})

function getStatus(status){
    switch (status){
        case 0: 
            return 'Order Placed';
        case 1:
            return 'Order Packed';
        case 2:
            return 'Out for Delivery';
        case 3:
            return 'Delivered';
        default: 
            return 'UNKNOWN_STATUS';
    }
}
const ActiveOrders = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });
    const history = useHistory()
    const orders = [
        {
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant:'100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant:'200gm', quantity: 4,  price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant:'50ml', price: 6.51 },
            ],
            total_price:342.64,
            order_date:'18th March 2021',
            expected_delivery: '23rd March 2021',
            status:2
        },
        {
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant:'100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant:'200gm', quantity: 4,  price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant:'50ml', price: 6.51 },
            ],
            total_price:342.64,
            order_date:'18th March 2021',
            expected_delivery: '23rd March 2021',
            status:2
        },        {
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant:'100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant:'200gm', quantity: 4,  price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant:'50ml', price: 6.51 },
            ],
            total_price:342.64,
            order_date:'18th March 2021',
            expected_delivery: '23rd March 2021',
            status:2
        },        {
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant:'100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant:'200gm', quantity: 4,  price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant:'50ml', price: 6.51 },
            ],
            total_price:342.64,
            order_date:'18th March 2021',
            expected_delivery: '23rd March 2021',
            status:2
        },
        
    ]

    const handleTrackClick = (order) => {
        history.push('/track')
    }

    return (
        <div className={classes.root}>
            <Typography variant={mobile ? 'h6' : 'h5'} align="left" className={classes.title}>
                YOUR RECENT PURCHASES
            </Typography>
            <Grid container direction='row'>
                {orders.map((order) => (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <Paper elevation={3} className={classes.itemRoot}>
                            <Grid container direction='column' >
                                <Typography  align='left' className={classes.itemTitle}>{order.items.length>1?order.items[0].name+ ' + ' + (order.items.length-1) +' more item(s)':order.items[0].name}</Typography>
                                <Typography align='left' className={classes.shopName}>{order.seller_name}</Typography>
                                <Typography align='left' className={classes.itemOrderedDate}>Ordered on : {order.order_date}</Typography>
                                <Typography align='left' className={classes.itemOrderedStatus}>Order Status : {getStatus(order.status)}</Typography>
                                <Typography align='left' className={classes.itemExpectedDelivery}>Expected Delivery: {order.expected_delivery}</Typography>
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
                                <Button variant='outlined' onClick={()=>handleTrackClick(order)} color='secondary' fullWidth endIcon={<LocationOn></LocationOn>}>Track Order</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </div>
    )

}
export default ActiveOrders;