import { Button, Divider, Fab, Grid, List, ListItem, ListItemText, makeStyles, MenuItem, Paper, Step, StepContent, StepLabel, Stepper, TextField, Typography } from "@material-ui/core"
import React from 'react'
import theme from '../../theme'
import ReactRoundedImage from 'react-rounded-image'
import deliveryBoyAvatar from '../../img/deliveryBoyAvatar.svg'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Edit, UpdateOutlined } from "@material-ui/icons"
const useStyles = makeStyles({
    listItem: {
        padding: theme.spacing(0, 2),
    },
    paperDetails: {
        padding: theme.spacing(2, 2, 2),
        margin: theme.spacing(2, 2, 2),
        width: '100%',
        maxWidth: '992px'
    },

    floatingLabelFocusStyle: {
        color: theme.palette.text.hint
    },
    shipmentToHeading: {
        fontWeight: 600
    },
    indOrdersContainer: {
        marginTop: theme.spacing(4)
    },
    fab:{
        
    },
    shopNameHeading: {
        margin: theme.spacing(0, 0, 1),
        fontWeight: 400
    },
    orderSummaryHeading: {
        margin: theme.spacing(2, 0, 0)
    },
    list: {
        margin: theme.spacing(1, 0, 1)
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
    trackingHead: {
        fontWeight: 600
    },
    label: {
        color: theme.palette.text.hint,
        fontSize: 18,
        textAlign: "left"
    },
    statusDate: {
        fontSize: 14,
    },
    statusTime: {
        fontSize: 12,
    },
    dateMargin:{
        margin: theme.spacing(0,2,0)
    },
    deliveryPersonDetails: {
        margin: theme.spacing(2, 0, 2)
    },
    deliveryPersonContact: {
        margin: theme.spacing(0, 1, 0)
    },
    expDeliveryText: {
        margin: theme.spacing(1, 0, 0),
        fontWeight: 600
    },
    statusContainer: {
        margin: theme.spacing(0, 2, 2)
    },
    assignDeliveryBtn: {
        margin: theme.spacing(1, 0, 0)
    }
})

function getSteps() {
    return ['Order Recieved', 'Pack', 'Assign Delivery Person', 'Out for Delivery', 'Delivered'];
}


const SellerViewOrder = () => {

    const steps = getSteps();
    const classes = useStyles();
    const [orderStatus, setOrderStatus] = React.useState(1)
    const [expectedDeliveryDate, setExpectedDeliveryDate] = React.useState();


    const address = {
        firstName: 'Prasoon',
        lastName: 'Baghel',
        addressLine1: 'D1103 Daljit Vihar, AWHO',
        addressLine2: 'Vrindawan Awas Yojna Sector 6A, Telibagh',
        city: 'Lucknow',
        state: 'Uttar Pradesh',
        zip: '226029',
        country: 'INDIA'
    }
    const order = {
        seller_name: 'M/s Agarwal General Store',
        items: [
            { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
            { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
            { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
        ],
        total_price: 342.64,
        expected_delivery: '23rd March 2021',
        status: 2
    }


    const handlePackedClicked = () => {
        setOrderStatus(orderStatus + 1)
    }
    const handleAssignDelivery = () => {
        setOrderStatus(orderStatus + 1)
    }

    const handleExpectedDeliveryDateChange = (date) => {
        setExpectedDeliveryDate(date)
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <Typography>on 16th April 2021</Typography>
            case 1:
                return (
                    <Grid container direction='column' alignItems='flex-start'>
                        <Button onClick={handlePackedClicked} color='secondary' variant='contained'>Mark Packed</Button>
                    </Grid>
                )
            case 2:
                return (
                    <div>
                        <Grid container direction='column' spacing={1} className={classes.deliveryStepContent}>
                            <Grid item>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    // variant="outlined" 
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    name="mobile"
                                    // variant="outlined"
                                    required
                                    fullWidth
                                    id="mobile"
                                    label="Mobile No."
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Button className={classes.assignDeliveryBtn} fullWidth onClick={handleAssignDelivery} color='secondary' variant='contained'>Assign Delivery Person</Button>
                            </Grid>

                        </Grid>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <Grid container direction='column' className={classes.deliveryStepContent}>
                            <Typography align='left' className={classes.statusDate}>on 18th April 2021 </Typography>
                            <Typography align='left' className={classes.statusTime}>03:36 PM</Typography>
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
                        </Grid>
                    </div>
                )
            case 4:
                return (
                    <div></div>
                )
            default:
                return 'UNKNOWN_STATUS'
        }
    }

    return (

        <Grid container direction='column' alignItems='center'>
            <Paper className={classes.paperDetails}>
                <Grid container direction='row'>
                    <Grid item xs={5}>
                        <React.Fragment>
                            <Grid container direction='column' alignItems='flex-start'>
                                <Typography align='left' className={classes.shipmentToHeading}>Shipment to:</Typography>
                                <Typography align='left'>{address.firstName + ' ' + address.lastName}</Typography>
                                <Typography align='left'>{address.addressLine1}</Typography>
                                <Typography align='left'>{address.addressLine2}</Typography>
                                <Typography align='left'>{address.city + ', ' + address.state}</Typography>
                                <Typography align='left'>{address.zip + ', ' + address.country}</Typography>
                            </Grid>

                            <Typography variant="h6" gutterBottom className={classes.orderSummaryHeading}>
                                Order Summary
                            </Typography>
                            <Grid container direction='column' className={classes.indOrdersContainer}>
                                <Typography variant='h6' align='left' className={classes.shopNameHeading}>{order.shopName}</Typography>
                                <Divider></Divider>
                                <List className={classes.list} disablePadding>
                                    {order.items.map((product) => (
                                        <ListItem className={classes.listItem} key={product.name}>
                                            <ListItemText primary={product.name + ' (' + product.variant + ')'} secondary={product.quantity + ' Nos.'} />
                                            <Typography variant="body2">$ {product.price * product.quantity}</Typography>
                                        </ListItem>
                                    ))}
                                </List>
                                <ListItem className={classes.listItem}>
                                    <ListItemText primary="Total" />
                                    <Typography variant="subtitle1" className={classes.total}>
                                        $ {order.total_price}
                                    </Typography>
                                </ListItem>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={5}>
                        <Grid container direction='column' alignItems='flex-start'>
                            <Typography variant='h6' className={classes.trackingHead}>Tracking Details</Typography>
                            <Grid item className={classes.dateMargin}>
                                <Grid container direction='row' alignItems='center'>
                                    <Grid item>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="expected-delivery"
                                                label="Expected Delivery Date"
                                                format="MM/dd/yyyy"
                                                value={expectedDeliveryDate}
                                                InputLabelProps={{
                                                    className: classes.floatingLabelFocusStyle
                                                }}
                                                onChange={handleExpectedDeliveryDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container direction='row' justify='center'>
                                <Grid item xs={12}>
                                    <Stepper className={classes.stepper} activeStep={orderStatus} orientation="vertical">
                                        {steps.map((label, index) => (
                                            <Step key={label} >
                                                <StepLabel classes={{ label: classes.label }}>
                                                    {label}
                                                </StepLabel>
                                                <StepContent>
                                                    {getStepContent(index)}
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )

}

export default SellerViewOrder;