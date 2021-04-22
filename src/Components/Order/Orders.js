import { Grid, makeStyles, Paper, Typography, Button } from "@material-ui/core"
import { ChevronRight, LocationOn, StoreOutlined } from "@material-ui/icons";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import {useHistory} from 'react-router-dom'
import Imgix from "react-imgix";
import no_orders from '../../img/no_orders.svg'

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

    emptyOrdersText: {
        letterSpacing: 2,
        color: theme.palette.text.hint,
        margin:theme.spacing(4,2,2)
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

const Orders = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });
    const history= useHistory();


    const orders = [
      {
        id: '93GD73BDB82H',
        seller_name: 'M/s Agarwal General Store',
        seller_address: 'Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India',
        items: [
          { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
          { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
          { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
        ],
        total_price: 342.64,
        mode:'online',
        customer_name: 'Prasoon Baghel',
        customer_mobile: '9133260431',
        delivery_address: 'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
        order_date: '18th March 2021',
        expected_delivery: '23rd March 2021',
        status: 2
      },
      {
        id: '93GD73BDB82H',
        seller_name: 'M/s Agarwal General Store',
        seller_address: 'Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India',
        items: [
          { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
          { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
        ],
        total_price: 342.64,
        mode:'online',
        customer_name: 'Prasoon Baghel',
        customer_mobile: '9133260431',
        delivery_address: 'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
        order_date: '18th March 2021',
        expected_delivery: '23rd March 2021',
        status: 2
      },
      {
        id: '93GD73BDB82H',
        seller_name: 'M/s Agarwal General Store',
        seller_address: 'Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India',
        items: [
          { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
          { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
        ],
        total_price: 342.64,
        mode:'online',
        customer_name: 'Prasoon Baghel',
        customer_mobile: '9133260431',
        delivery_address: 'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
        order_date: '18th March 2021',
        expected_delivery: '23rd March 2021',
        status: 2
      },
      {
        id: '93GD73BDB82H',
        seller_name: 'M/s Agarwal General Store',
        seller_address: 'Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India',
        items: [
          { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
          { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
        ],
        total_price: 342.64,
        mode:'offline',
        customer_name: 'Prasoon Baghel',
        customer_mobile: '9133260431',
        delivery_address: 'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
        order_date: '18th March 2021',
        expected_delivery: '23rd March 2021',
        status: 2
      },

    ]

    const handleTrackClick= (order)=>{
        console.log(order)
        if(order.mode==='online')
            history.push('/track')
        else history.push('/pickup')
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
                                    <Typography className={classes.orderStatus} align='left'>{order.mode==='online'?getStatus(order.status):'Offline Pickup'}</Typography>
                                </Grid>
                                <Button color='secondary' onClick={() => handleTrackClick (order)} endIcon={order.mode==='online'?<LocationOn></LocationOn>:<ChevronRight></ChevronRight>} variant='outlined'>{order.mode==='online'?'Track Your Order':'View your Order'}</Button>
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
                    {orders.length === 0 &&
                        <Grid container direction='column' alignItems='center'>
                            <Imgix
                                src={no_orders}
                                width="400"
                                height="400"
                                imgixParams={{
                                    fit: "fit",
                                    fm: "svg",
                                }}
                            />
                            <Typography className={classes.emptyOrdersText} variant='h5'>Your don't have any orders to show. </Typography>
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    )

}

export default Orders;