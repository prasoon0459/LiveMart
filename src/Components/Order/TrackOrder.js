import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../theme";
import ReactRoundedImage from "react-rounded-image";
import deliveryBoyAvatar from "../../img/deliveryBoyAvatar.svg";

const useStyles = makeStyles({
  listItem: {
    padding: theme.spacing(0, 2),
  },
  paperDetails: {
    padding: theme.spacing(2, 2, 2),
    margin: theme.spacing(2, 2, 2),
    width: "100%",
    maxWidth: "992px",
  },
  shipmentToHeading: {
    fontWeight: 600,
  },
  indOrdersContainer: {
    marginTop: theme.spacing(4),
  },
  shopNameHeading: {
    margin: theme.spacing(0, 0, 1),
    fontWeight: 400,
  },
  orderSummaryHeading: {
    margin: theme.spacing(2, 0, 0),
  },
  list: {
    margin: theme.spacing(1, 0, 1),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  trackingHead: {
    fontWeight: 600,
  },
  label: {
    color: theme.palette.text.hint,
    fontSize: 18,
    textAlign: "left",
  },
  statusDate: {
    fontSize: 14,
  },
  statusTime: {
    fontSize: 12,
  },
  deliveryPersonDetails: {
    margin: theme.spacing(2, 0, 2),
  },
  deliveryPersonContact: {
    margin: theme.spacing(0, 1, 0),
  },
  expDeliveryText: {
    margin: theme.spacing(1, 0, 0),
    fontWeight: 600,
  },
});

function getSteps() {
  return ["Ordered", "Packed", "Out for Delivery", "Delivered"];
}

const TrackOrder = (props) => {
  const steps = getSteps();
  const classes = useStyles();
  //   const address = {
  //     firstName: "Prasoon",
  //     lastName: "Baghel",
  //     addressLine1: "D1103 Daljit Vihar, AWHO",
  //     addressLine2: "Vrindawan Awas Yojna Sector 6A, Telibagh",
  //     city: "Lucknow",
  //     state: "Uttar Pradesh",
  //     zip: "226029",
  //     country: "INDIA",
  //   };
  const address = props.location.order.deliveryAddress;
  const order = props.location.order;
  const name = order.name;
  const phno = order.phno;
  //   const order = {
  //     id: "93GD73BDB82H",
  //     seller_name: "M/s Agarwal General Store",
  //     seller_address:
  //       "Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India",
  //     items: [
  //       { name: "Lifeboy Soap", variant: "100gm", quantity: 6, price: 9.99 },
  //       {
  //         name: "Kurkure Masala Munch",
  //         variant: "200gm",
  //         quantity: 4,
  //         price: 3.45,
  //       },
  //       {
  //         name: "Dettol Hand Sanitizer",
  //         quantity: 2,
  //         variant: "50ml",
  //         price: 6.51,
  //       },
  //     ],
  //     total_price: 342.64,
  //     mode: "online",
  //     customer_name: "Prasoon Baghel",
  //     customer_mobile: "9133260431",
  //     delivery_address:
  //       "D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India",
  //     order_date: "18th March 2021",
  //     expected_delivery: "23rd March 2021",
  //     status: 2,
  //   };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Typography>{order.date.slice(0, 10)}</Typography>;
      case 1:
        return (
          <div>
            <Typography className={classes.statusDate}>
              on 18th April 2021{" "}
            </Typography>
            <Typography className={classes.statusTime}>03:36 PM</Typography>
          </div>
        );
      case 2:
        return (
          <div>
            <Grid
              container
              direction="column"
              className={classes.deliveryStepContent}
            >
              <Typography align="left" className={classes.statusDate}>
                on 18th April 2021{" "}
              </Typography>
              <Typography align="left" className={classes.statusTime}>
                03:36 PM
              </Typography>
              <Grid
                className={classes.deliveryPersonDetails}
                container
                direction="row"
                alignItems="center"
              >
                <ReactRoundedImage
                  image={deliveryBoyAvatar}
                  imageWidth="40"
                  imageHeight="40"
                  roundedSize={1}
                ></ReactRoundedImage>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={classes.deliveryPersonContact}
                  >
                    <Typography className={classes.DeliveryBoyName}>
                      Ramesh Pawar
                    </Typography>
                    <Typography className={classes.DeliveryBoyMobile}>
                      +919567289930
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case 3:
        return "The product was delivered successfully";
      default:
        return "UNKNOWN_STATUS";
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      {console.log(props.location.order)}
      <Paper className={classes.paperDetails}>
        <Grid container direction="row">
          <Grid item xs={5}>
            <React.Fragment>
              <Grid container direction="column" alignItems="flex-start">
                <Typography align="left" className={classes.shipmentToHeading}>
                  Shipment to:
                </Typography>
                <Typography align="left">{name}</Typography>
                <Typography align="left">{phno}</Typography>
                <Typography align="left">{address}</Typography>
                {/* <Typography align="left">{address.addressLine2}</Typography>
                <Typography align="left">
                  {address.city + ", " + address.state}
                </Typography>
                <Typography align="left">
                  {address.zip + ", " + address.country}
                </Typography> */}
                <Typography align="left" className={classes.expDeliveryText}>
                  Expected Delivery :{" "}
                  {new Date(order.expectedDate).toLocaleDateString()}
                </Typography>
              </Grid>

              <Typography
                variant="h6"
                gutterBottom
                className={classes.orderSummaryHeading}
              >
                Order Summary
              </Typography>
              <Grid
                container
                direction="column"
                className={classes.indOrdersContainer}
              >
                <Typography
                  variant="h6"
                  align="left"
                  className={classes.shopNameHeading}
                >
                  {order.shopName}
                </Typography>
                <Divider></Divider>
                <List className={classes.list} disablePadding>
                  {order.cartItems.map((product) => (
                    <ListItem className={classes.listItem} key={product.id}>
                      <ListItemText
                        primary={product.productName}
                        secondary={
                          product.quantity + " " + product.productId.unit
                        }
                      />
                      <Typography variant="body2">
                        $ {product.productPrice * product.quantity}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    $ {order.total_amount}
                  </Typography>
                </ListItem>
              </Grid>
            </React.Fragment>
          </Grid>
          <Grid item xs={7}>
            <Grid container direction="column">
              <Typography variant="h6" className={classes.trackingHead}>
                Tracking Details
              </Typography>
              <Grid container direction="row" justify="center">
                <Grid item xs={8}>
                  <Stepper
                    className={classes.stepper}
                    activeStep={order.status}
                    orientation="vertical"
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel classes={{ label: classes.label }}>
                          {label}
                        </StepLabel>
                        <StepContent>{getStepContent(index)}</StepContent>
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
  );
};

export default TrackOrder;
