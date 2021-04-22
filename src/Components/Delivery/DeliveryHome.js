import { Grid, makeStyles, Paper, Typography, Button, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import theme from "../../theme";
import SwipeableViews from 'react-swipeable-views';
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import React from "react";
import {dummy_orders} from '../Order/dummyorders'
import { CheckSharp } from "@material-ui/icons";
import Imgix from "react-imgix";
import no_orders from '../../img/no_orders.svg'
import no_data from '../../img/no_data.svg'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    paper: {
        margin:theme.spacing(2,2,2),
        maxWidth:'992px',
        width:'100%',
    },
    itemPaper:{
        width:'100%',
        margin:theme.spacing(1,0,1),
        padding:theme.spacing(2,2,2)
    },
    flexGrow:{
        flexGrow:1
    },
    customerName:{
        fontWeight:600
    },
    orderID:{
        fontWeight:600
    },
    orderIDcontainer:{
        margin:theme.spacing(2,0,0)
    },
    mobileNo:{
        margin:theme.spacing(2,0,0)
    },

    emptyOrdersText: {
        letterSpacing: 2,
        color: theme.palette.text.hint,
        margin: theme.spacing(4, 2, 2)
    }

});

const DeliveryHome = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === "xs";
    const sm = screen === "sm";
    const classes = useStyles({ mobile: mobile, sm: sm });
    const history = useHistory();
    const [transactions, setTransactions] = React.useState([]);
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const [tab_value, setTabValue] = React.useState(0);
    const [orders, setOrders] = React.useState(dummy_orders);
    const [delivered_orders, setDeliveredOrders] =React.useState([]);


    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setTabValue(index);
    };

    const handleDeliveredClick= (index1) => {
        const deliveredOrder = orders[index1];
        const newOrders= orders.filter(function(value, index, arr){ 
            return index1!==index;
        });
        setOrders(newOrders);
        deliveredOrder.status=3
        setDeliveredOrders([...delivered_orders,deliveredOrder])
    }

    return (
        <Grid container direction='column' alignItems='center' className={classes.root}>
            {/* <Paper className={classes.paper}> */}
            <Grid container direction='column' className={classes.paper}>
            <AppBar position="static"  >
                <Tabs
                    value={tab_value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Orders to Deliver" {...a11yProps(0)} />
                    <Tab label="Delivered" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={tab_value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={tab_value} index={0} dir={theme.direction}>
                    <Grid container direction='column' alignItems='center' className={classes.toDeliverRoot}>
                        {orders.map((order, index) => (
                            order.status===2&&
                            <Paper className={classes.itemPaper}>
                                <Grid container direction='column'>
                                    <Grid container direction='row' alignItems='center'>
                                        <Grid item className={classes.flexGrow}>
                                            <Typography align='left' className={classes.customerName}>{order.customer_name}</Typography>            
                                        </Grid>
                                        <Grid item>
                                            <Button variant='contained' color='primary' onClick={()=>handleDeliveredClick(index)} endIcon={<CheckSharp></CheckSharp>}>
                                                Mark Delivered
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align='left'>{order.delivery_address}</Typography>
                                        <Typography align='left' className={classes.mobileNo}>{'Mobile No. : '+order.customer_mobile}</Typography>
                                    </Grid>
                                    <Grid container direction='row' className={classes.orderIDcontainer}>
                                        <Grid item>
                                            <Typography align='left' className={classes.orderID}>Order ID : </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align='left'>{order.id}</Typography>
                                        </Grid>
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
                                <Typography className={classes.emptyOrdersText} variant='h5'>Your don't have any orders to Deliver. </Typography>
                            </Grid>
                        }
                    </Grid>
                </TabPanel>
                <TabPanel value={tab_value} index={1} dir={theme.direction}>
                    <Grid container direction='column' alignItems='center' className={classes.toDeliverRoot}>
                        {delivered_orders.map((order, index) => (
                            order.status===3&&
                            <Paper className={classes.itemPaper}>
                                <Grid container direction='column'>
                                    <Grid container direction='row' alignItems='center'>
                                        <Grid item className={classes.flexGrow}>
                                            <Typography align='left' className={classes.customerName}>{order.customer_name}</Typography>            
                                        </Grid>
                                        <Grid item>
                                            <Button variant='outlined' disabled color='primary' onClick={()=>handleDeliveredClick(index)} endIcon={<CheckSharp></CheckSharp>}>
                                                Delivered
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography align='left'>{order.delivery_address}</Typography>
                                        <Typography align='left' className={classes.mobileNo}>{'Mobile No. : '+order.customer_mobile}</Typography>
                                    </Grid>
                                    <Grid container direction='row' className={classes.orderIDcontainer}>
                                        <Grid item>
                                            <Typography align='left' className={classes.orderID}>Order ID : </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography align='left'>{order.id}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                        {delivered_orders.length === 0 &&
                            <Grid container direction='column' alignItems='center'>
                                <Imgix
                                    src={no_data}
                                    width="300"
                                    height="300"
                                    imgixParams={{
                                        fit: "fit",
                                        fm: "svg",
                                    }}
                                />
                                <Typography className={classes.emptyOrdersText} variant='h5'>Your have no deliveries to show. </Typography>
                            </Grid>
                        }
                    </Grid>                            
                </TabPanel>
            </SwipeableViews>
            </Grid>
            {/* </Paper> */}
        </Grid>
    );
};

export default DeliveryHome;
