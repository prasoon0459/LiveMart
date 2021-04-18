import { Grid, makeStyles, Paper, Typography, Button } from "@material-ui/core"
import { LocationOn, StoreOutlined } from "@material-ui/icons";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 3, 1),
    },
    ordersContainer: {
        padding: (props) => props.sm || props.mobile ? theme.spacing(2, 0, 0) : theme.spacing(4, 5, 0),
    },
    orderPaper: {
        width: '100%',
        margin: theme.spacing(1, 1, 1),
        padding: theme.spacing(2, 2, 2),
        maxWidth: '992px'
    },
    orderItems: {
        margin: theme.spacing(2, 2, 2)
    },
    storeIcon: {
        margin: theme.spacing(0, 1, 0)
    },
    orderStatus: {
        fontSize: 18,
        letterSpacing: 1,
        margin: theme.spacing(1, 0, 1)
    },
    orderStatusItem: {
        flexGrow: 1,
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
        margin: theme.spacing(0, 1, 1)
    },
    title: {
        fontWeight: 500,
        letterSpacing: 2,
        margin: (props) => props.mobile ? theme.spacing(2, 1, 2) : theme.spacing(2, 2, 1),
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
    },

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

const Orders = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });
    const history= useHistory();


    const orders = [
        {
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant:'100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant:'200gm', quantity: 4,  price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant:'50ml', price: 6.51 },
            ],
            total_price:342.64,
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
            expected_delivery: '23rd March 2021',
            status:2
        },
        
    ]
    const handleTrackClick= (order)=>{
        console.log(order)
        history.push('/track')
    }

    return (
        <div className={classes.root}>
            <Grid container direction="column" alignItems='center' className={classes.root}>
                <Typography variant={mobile ? 'h6' : 'h5'} align="left" className={classes.title}>
                    My Orders
                </Typography>
                <Grid container direction='column' alignItems='center' className={classes.ordersContainer}>
                    {orders.map((order) => (
                        <Paper className={classes.orderPaper}>
                            <Grid container alignItems='center' direction='row'>
                                <Grid item className={classes.orderStatusItem}>
                                    <Typography className={classes.orderStatus} align='left'>{getStatus(order.status)}</Typography>
                                </Grid>
                                <Button color='secondary' onClick={() => handleTrackClick (order)} endIcon={<LocationOn></LocationOn>} variant='outlined'>Track Your Order</Button>
                            </Grid>
                            <Grid container direction='row' width='100%'>
                                <StoreOutlined className={classes.storeIcon}></StoreOutlined>
                                <Grid item><Typography className={classes.orderStoreName}>{order.seller_name}</Typography></Grid>
                            </Grid>
                            <Grid container className={classes.orderItems} direction='column'>
                                <Grid item>
                                    {order.items.map((item)=>(
                                        <Typography align='left'>{item.name + ' (' + item.variant + ') - '+item.quantity}</Typography>
                                    ))} 
                                </Grid>
                            </Grid>
                            <Grid container direction='row' alignItems='center'>
                                <Grid item xs={12} sm={6}>
                                    <Typography className={classes.orderDeliveryDate} align='left'>Delivery Date: {order.expected_delivery}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography className={classes.orderTotalPrice} align='right'>Total Price: $ {order.total_price}</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </div>
    )

}

export default Orders;