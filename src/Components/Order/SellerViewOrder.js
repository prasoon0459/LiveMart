/* eslint-disable */

import {
  Button,
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
  TextField,
  Typography,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import theme from "../../theme";
import ReactRoundedImage from "react-rounded-image";
import deliveryBoyAvatar from "../../img/deliveryBoyAvatar.svg";
// import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import axios from "axios";
import serverUrl from "../../serverURL";
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

  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  shipmentToHeading: {
    fontWeight: 600,
  },
  indOrdersContainer: {
    marginTop: theme.spacing(4),
  },
  fab: {},
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
  dateMargin: {
    margin: theme.spacing(0, 2, 0),
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
  statusContainer: {
    margin: theme.spacing(0, 2, 2),
  },
  assignDeliveryBtn: {
    margin: theme.spacing(1, 0, 0),
  },
});

function getSteps() {
  return [
    "Order Recieved",
    "Pack",
    "Assign Delivery Person",
    "Out for Delivery",
    "Delivered",
  ];
}

const SellerViewOrder = (props) => {
  const steps = getSteps();
  const classes = useStyles();

  const order = props.location.order;
  // console.log(order)
  // const [expectedDeliveryDate, setExpectedDeliveryDate] = React.useState(
  //   new Date(order.expectedDate)
  // );
  const [orderStatus, setOrderStatus] = React.useState(
    (order.delStatus === "Packed" ? 2 : order.delStatus === "Out for Delivery")
      ? 3
      : order.delStatus === "Delivered"
      ? 4
      : 1
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [delId, setDelId] = useState(0);
  const user_type = localStorage.getItem("usertype");
  // const [selectedId, setSelectedId] = useState(0);

  const handleMenuItemClick = (event, order_id) => {
    setDelId(order_id);
  };

  const handlePackedClicked = () => {
    setOrderStatus(orderStatus + 1);
    var data = JSON.stringify({
      id: order.id,
    });
    var config = {};
    if (user_type === "2") {
      config = {
        method: "post",
        url: serverUrl + "/packed_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    } else if (user_type === "1") {
      config = {
        method: "post",
        url: serverUrl + "/packed_retail_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAssignDelivery = (order_id) => {
    var data = JSON.stringify({
      id: order.id,
      delId: order_id,
    });
    var config = {};
    if (user_type === "2") {
      config = {
        method: "post",
        url: serverUrl + "/assigned_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    } else if (user_type === "1") {
      config = {
        method: "post",
        url: serverUrl + "/assigned_retail_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOrderStatus(orderStatus + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const handleExpectedDeliveryDateChange = (date) => {
  //   setExpectedDeliveryDate(date);
  // };

  const getStepContent = (step) => {
    if (order.delStatus === "Packed") {
      step = 2;
    }
    if (order.delStatus === "Out for Delivery") {
      step = 3;
    }
    console.log(order);
    switch (step) {
      case 0:
        return <Typography>on 16th April 2021</Typography>;
      case 1:
        return (
          <Grid container direction="column" alignItems="flex-start">
            <Button
              onClick={handlePackedClicked}
              color="secondary"
              variant="contained"
            >
              Mark Packed
            </Button>
          </Grid>
        );
      case 2:
        return (
          <div>
            <Grid
              container
              direction="column"
              spacing={1}
              className={classes.deliveryStepContent}
            >
              <Grid item>
                <TextField
                  id="delivery"
                  select
                  fullWidth
                  label="Select Delivery Person"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  variant="outlined"
                >
                  {order.shopId.delIds.map((option, index) => {
                    var order_id = "";
                    for (var i = option.length - 2; i >= 0; i--) {
                      if (option[i] === "/") break;
                      else order_id += option[i];
                    }
                    order_id = order_id.split("").reverse().join("");
                    console.log(order_id);
                    return (
                      <MenuItem
                        key={order_id}
                        value={order_id}
                        selected={index === selectedIndex}
                        onClick={(event) =>
                          handleMenuItemClick(event, order_id)
                        }
                      >
                        ID - {order_id}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid item>
                <Button
                  className={classes.assignDeliveryBtn}
                  fullWidth
                  onClick={() => handleAssignDelivery(delId)}
                  color="secondary"
                  variant="contained"
                >
                  Assign Delivery Person
                </Button>
              </Grid>
            </Grid>
          </div>
        );
      case 3:
        return (
          <div>
            <Grid
              container
              direction="column"
              className={classes.deliveryStepContent}
            >
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
                  {order.delName !== null ? (
                    <Grid
                      container
                      direction="column"
                      className={classes.deliveryPersonContact}
                    >
                      <Typography className={classes.DeliveryBoyName}>
                        {order.delName}
                      </Typography>
                      <Typography className={classes.DeliveryBoyMobile}>
                        +91 {order.delPhno}
                      </Typography>
                    </Grid>
                  ) : (
                    "Please Refresh"
                  )}
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case 4:
        return <div></div>;
      default:
        return "UNKNOWN_STATUS";
    }
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Paper className={classes.paperDetails}>
        <Grid container direction="row">
          <Grid item xs={5}>
            <React.Fragment>
              <Grid container direction="column" alignItems="flex-start">
                <Typography align="left" className={classes.shipmentToHeading}>
                  Shipment to:
                </Typography>
                <Typography align="left">{order.name}</Typography>
                <Typography align="left">{order.deliveryAddress}</Typography>
                {/* <Typography align="left">{address.addressLine2}</Typography>
                <Typography align="left">
                  {address.city + ", " + address.state}
                </Typography>
                <Typography align="left">
                  {address.zip + ", " + address.country}
                </Typography> */}
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
                  {user_type === "1"
                    ? order.retailCartItems.map((product) => (
                        <ListItem className={classes.listItem} key={product.id}>
                          <ListItemText
                            primary={product.retailProductName}
                            secondary={product.quantity + " Nos."}
                          />
                          <Typography variant="body2">
                            ₹ {product.retailProductPrice * product.quantity}
                          </Typography>
                        </ListItem>
                      ))
                    : order.cartItems.map((product) => (
                        <ListItem className={classes.listItem} key={product.id}>
                          <ListItemText
                            primary={product.productName}
                            secondary={product.quantity + " Nos."}
                          />
                          <Typography variant="body2">
                            ₹ {product.productPrice * product.quantity}
                          </Typography>
                        </ListItem>
                      ))}
                </List>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    ₹ {order.total_amount}
                  </Typography>
                </ListItem>
              </Grid>
            </React.Fragment>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Grid container direction="column" alignItems="flex-start">
              <Typography variant="h6" className={classes.trackingHead}>
                Tracking Details
              </Typography>
              {/* <Grid item className={classes.dateMargin}>
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="expected-delivery"
                        label="Expected Delivery Date"
                        format="MM/dd/yyyy"
                        value={expectedDeliveryDate}
                        InputLabelProps={{
                          className: classes.floatingLabelFocusStyle,
                        }}
                        onChange={handleExpectedDeliveryDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Grid>
              </Grid> */}
              <Grid container direction="row" justify="center">
                <Grid item xs={12}>
                  <Stepper
                    className={classes.stepper}
                    activeStep={orderStatus}
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

export default withRouter(SellerViewOrder);
