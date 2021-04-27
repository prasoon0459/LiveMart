import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../theme";
import Check from "../../img/check.gif";
import Imgix from "react-imgix";
import { withRouter } from "react-router-dom";
import serverUrl from "../../serverURL";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    padding: theme.spacing(1, 1, 1),
  },
  listItem: {
    padding: theme.spacing(0, 2),
  },
  paperDetails: {
    padding: theme.spacing(2, 2, 2),
    width: "100%",
    maxWidth: "600px",
    borderRadius: 10,
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
  btnMark: {
    margin: theme.spacing(2, 0, 0),
  },
});

const ViewPickup = (props) => {
  const classes = useStyles();
  const order = props.location.order;
  const address = order.shopId.address;
  const shopName = order.shopId.name;
  const user_type = localStorage.getItem("usertype");
  const [collected, setCollected] = React.useState(false);

  const handleMarkCollected = (order) => {
    var data = JSON.stringify({
      id: order.id,
    });
    var config = {};
    if (user_type === "2") {
      config = {
        method: "post",
        url: serverUrl + "/pickup_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    } else if (user_type === "1") {
      config = {
        method: "post",
        url: serverUrl + "/pickup_retail_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setCollected(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <Paper className={classes.paperDetails}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <React.Fragment>
              <Grid container direction="row" alignItems="center">
                <Grid item sm={6} xs={12}>
                  <Grid container direction="column" alignItems="flex-start">
                    <Typography
                      align="left"
                      className={classes.shipmentToHeading}
                    >
                      Pickup From :
                    </Typography>
                    <Typography align="left">{shopName}</Typography>
                    <Typography align="left">{address}</Typography>
                    <Typography
                      align="left"
                      className={classes.expDeliveryText}
                    >
                      Pickup Date :{" "}
                    </Typography>
                    <Typography align="left">{order.delDate}</Typography>
                    5:00PM
                  </Grid>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Grid container direction="column" alignItems="center">
                    <Imgix
                      src={Check}
                      width="100"
                      height="100"
                      imgixParams={{
                        fit: "fit",
                        fm: "gif",
                      }}
                    ></Imgix>
                    <Typography>{order.delStatus}</Typography>
                    {order.delStatus === "Order Placed" && (
                      <Button
                        variant="contained"
                        disabled={collected}
                        onClick={() => handleMarkCollected(order)}
                        color="secondary"
                        className={classes.btnMark}
                      >
                        Mark Collected
                      </Button>
                    )}
                  </Grid>
                </Grid>
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
                  {user_type === "2"
                    ? order.cartItems.map((cartItem) => (
                        <ListItem
                          className={classes.listItem}
                          key={cartItem.id}
                        >
                          <ListItemText
                            primary={
                              cartItem.productName +
                              " (" +
                              cartItem.quantity +
                              " " +
                              "x" +
                              cartItem.productId.unit +
                              " )"
                            }
                            // secondary={product.quantity + " Nos."}
                          />
                          <Typography variant="body2">
                            ₹ {cartItem.productPrice * cartItem.quantity}
                          </Typography>
                        </ListItem>
                      ))
                    : order.retailCartItems.map((retailCartItem) => (
                        <ListItem
                          className={classes.listItem}
                          key={retailCartItem.id}
                        >
                          <ListItemText
                            primary={
                              retailCartItem.retailProductName +
                              " (" +
                              retailCartItem.quantity +
                              " " +
                              "x" +
                              retailCartItem.retailProductId.productId.unit +
                              " )"
                            }
                            // secondary={product.quantity + " Nos."}
                          />
                          <Typography variant="body2">
                            ₹{" "}
                            {retailCartItem.retailProductPrice *
                              retailCartItem.quantity}
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
        </Grid>
      </Paper>
    </Grid>
  );
};

export default withRouter(ViewPickup);
