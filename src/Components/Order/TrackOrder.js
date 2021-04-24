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
import { withRouter } from "react-router-dom";

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
  return ["Order Placed", "Packed", "Out for Delivery", "Delivered"];
}

const TrackOrder = (props) => {
  const steps = getSteps();
  const classes = useStyles();
  const address = props.location.order.deliveryAddress;
  const order = props.location.order;
  const name = order.name;
  const phno = order.phno;
  const user_type = localStorage.getItem("usertype");

  const getOrderStatus = (c) => {
    if (c === "Order Placed") {
      return 0;
    } else if (c === "Packed") {
      return 1;
    } else if (c === "Out for Delivery") {
      return 2;
    } else if (c === "Delivered") {
      return 3;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case "Order Placed":
        return <Typography>{order.date.slice(0, 10)}</Typography>;
      case "Packed":
        return (
          <div>
            <Typography className={classes.statusDate}>
              on 18th April 2021{" "}
            </Typography>
            <Typography className={classes.statusTime}>03:36 PM</Typography>
          </div>
        );
      case "Out for Delivery":
        return (
          <div>
            <Grid
              container
              direction="column"
              className={classes.deliveryStepContent}
            >
              {/* <Typography align="left" className={classes.statusDate}>
                on 18th April 2021{" "}
              </Typography>
              <Typography align="left" className={classes.statusTime}>
                03:36 PM
              </Typography> */}
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
                      {order.delName}
                    </Typography>
                    <Typography className={classes.DeliveryBoyMobile}>
                      {order.delPhno}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case "Delivered":
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
                  {user_type === "0"
                    ? order.retailCartItems.map((retailCartItem) => (
                        <ListItem
                          className={classes.listItem}
                          key={retailCartItem.id}
                        >
                          <ListItemText
                            primary={retailCartItem.retailProductName}
                            secondary={
                              retailCartItem.quantity +
                              " " +
                              retailCartItem.retailProductId.productId.unit
                            }
                          />
                          <Typography variant="body2">
                            ${" "}
                            {retailCartItem.retailProductPrice *
                              retailCartItem.quantity}
                          </Typography>
                        </ListItem>
                      ))
                    : order.cartItems.map((product) => (
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
                    activeStep={getOrderStatus(order.delStatus)}
                    orientation="vertical"
                  >
                    {steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel classes={{ label: classes.label }}>
                          {label}
                        </StepLabel>
                        <StepContent>
                          {getStepContent(order.delStatus)}
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
  );
};

export default withRouter(TrackOrder);
