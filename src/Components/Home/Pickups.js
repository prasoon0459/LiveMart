import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { ChevronRight, } from "@material-ui/icons";
import ReactRoundedImage from 'react-rounded-image'
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import Avatar from '../../img/deliveryBoyAvatar.svg'
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
    },
    itemOrderedDate: {
        color: theme.palette.text.hint,
        marginLeft: theme.spacing(1)
    },
    itemOrderedBy: {
        // color:theme.palette.text.hint,
        margin: theme.spacing(2, 1, 0)

    },
    itemPickupTime: {
        // color:theme.palette.text.hint,
        margin: theme.spacing(0, 1, 2)
    },
    itemOrderID: {
        // color:theme.palette.text.hint,
        margin: theme.spacing(0, 1, 0)
    },
    customerDetailsContainer: {
        margin: theme.spacing(1, 1, 2)
    },
    customerContact: {
        margin: theme.spacing(0, 1, 0)
    },
    CustomerMobile:{
        margin:theme.spacing(0,1,0)
    },
    CustomerName:{
        margin:theme.spacing(0,1,0)
    },
    CustomerDetailsHeading: {
        fontWeight: 500
    }

})

const Pickups = () => {
    const history=useHistory()
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });
    

    const orders = [
        {
            id:'93GD73BDB82H',
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
            ],
            total_price: 342.64,
            customer_name:'Prasoon Baghel',
            customer_mobile:'9133260431',
            delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
            order_date: '18th March 2021',
            expected_delivery: '23rd March 2021',
            status: 2
        },
        {
            id:'93GD73BDB82H',
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
            ],
            total_price: 342.64,
            customer_name:'Prasoon Baghel',
            customer_mobile:'9133260431',
            delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
            order_date: '18th March 2021',
            expected_delivery: '23rd March 2021',
            status: 2
        }, 
        {
            id:'93GD73BDB82H',
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
            ],
            total_price: 342.64,
            customer_name:'Prasoon Baghel',
            customer_mobile:'+919133260431',
            delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
            order_date: '18th March 2021',
            expected_delivery: '23rd March 2021',
            status: 2
        }, 
        {
            id:'93GD73BDB82H',
            seller_name: 'M/s Agarwal General Store',
            items: [
                { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
                { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
                { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
            ],
            total_price: 342.64,
            customer_name:'Prasoon Baghel',
            customer_mobile:'9133260431',
            delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
            order_date: '18th March 2021',
            expected_delivery: '23rd March 2021',
            status: 2
        },

    ]

    const handlePickupClick = () => {
        history.push('/pickup')
    }

    return (
        <div className={classes.root}>
            <Typography variant={mobile ? 'h6' : 'h5'} align="left" className={classes.title}>
                Pickups Scheduled for Today
            </Typography>
            <Grid container direction='row'>
                {orders.map((order) => (
                    <Grid item lg={3} md={4} sm={6} xs={12}>
                        <Paper elevation={3} className={classes.itemRoot}>
                            <Grid container direction='column' >
                                <Typography variant='h6' align='left' className={classes.itemTitle}>{order.items.length>1?order.items[0].name + ' + '+(order.items.length-1)+' more items':order.items[0].name}</Typography>
                                <Typography align='left' className={classes.itemOrderedDate}>Ordered on : {order.order_date}</Typography>
                                <Typography align='left' className={classes.itemOrderID}>Order ID : {order.id}</Typography>
                                <Typography align='left' className={classes.itemPickupTime}>Pickup : {order.expected_delivery}</Typography>
                                <Typography variant='subtitle1' align='left' className={classes.CustomerDetailsHeading}>Customer Details</Typography>
                                <Grid className={classes.customerDetailsContainer} container direction='row' alignItems='center'>
                                    <ReactRoundedImage
                                        image={Avatar}
                                        imageWidth='40'
                                        imageHeight='40'
                                        roundedSize={1}
                                    >
                                    </ReactRoundedImage>
                                    <Grid item>
                                        <Grid container direction='column' className={classes.customerContact}>
                                            <Typography align='left' className={classes.CustomerName}>{order.customer_name}</Typography>
                                            <Typography align='left' className={classes.CustomerMobile}>{order.customer_mobile}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Button variant='outlined' color='secondary' onClick={handlePickupClick} fullWidth endIcon={<ChevronRight></ChevronRight>}>View Order</Button>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

        </div>
    )

}
export default Pickups;