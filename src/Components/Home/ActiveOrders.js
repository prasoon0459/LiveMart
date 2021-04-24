import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import ReactRoundedImage from "react-rounded-image";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import deliveryBoyAvatar from "../../img/deliveryBoyAvatar.svg";
import { useHistory } from "react-router-dom";
import serverUrl from "../../serverURL";
import React from "react";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(2, 2, 2),
    background: theme.palette.background.paper,
  },
  itemRoot: {
    borderRadius: 10,
    padding: theme.spacing(2, 2, 2),
    margin: theme.spacing(2, 2, 2),
  },
  title: {
    fontWeight: 800,
    margin: (props) =>
      props.mobile ? theme.spacing(2, 0, 2) : theme.spacing(2, 0, 3),
    padding: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: 18,
  },
  itemOrderedDate: {
    color: theme.palette.text.hint,
    marginLeft: theme.spacing(1),
  },
  itemOrderedStatus: {
    // color:theme.palette.text.hint,
    margin: theme.spacing(2, 1, 0),
  },
  itemExpectedDelivery: {
    // color:theme.palette.text.hint,
    margin: theme.spacing(0, 1, 0),
  },
  deliveryPersonDetails: {
    margin: theme.spacing(2, 1, 2),
  },
  deliveryPersonContact: {
    margin: theme.spacing(0, 1, 0),
  },
  shopName: {
    margin: theme.spacing(0, 1, 0),
  },
  itemDeliveryDetails: {
    fontWeight: 600,
  },
  trackBtn: {
    margin: theme.spacing(2, 0, 0),
  },
});

const ActiveOrders = () => {
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const classes = useStyles({ mobile: mobile, sm: sm });
  const history = useHistory();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");
  const [activeOrders, setActiveOrders] = React.useState([]);

  const getActiveOrders = () => {
    var config = {};
    if (user_type === "1") {
      config = {
        method: "get",
        url: serverUrl + "/transactions/?b=" + username,
        headers: {
          Authorization: "JWT " + token,
        },
      };
    } else {
      config = {
        method: "get",

        url: serverUrl + "/retail_transactions/?b=" + username,
        headers: {
          Authorization: "JWT " + token,
        },
      };
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var orders = [];
        for (var i = 0; i < response.data.length; i++) {
          if (
            response.data[i].delStatus === "Order Placed" ||
            response.data[i].delStatus === "Packed" ||
            response.data[i].delStatus === "Out for Delivery"
          )
            orders.push(response.data[i]);
        }
        setActiveOrders(orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    try {
      getActiveOrders();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTrackClick = (order) => {
    console.log(order);
    history.push({
      pathname: "/track",
      order: order,
    });
  };

  const getFormattedDate = (date) => {
    var d = new Date(date);
    return d.toDateString();
  };

  return (
    <div className={classes.root}>
      <Typography
        variant={mobile ? "h6" : "h5"}
        align="left"
        className={classes.title}
      >
        YOUR ACTIVE PURCHASES
      </Typography>
      <Grid container direction="row">
        {activeOrders.map((order) => (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper elevation={3} className={classes.itemRoot}>
              <Grid container direction="column">
                {user_type === "1" ? (
                  <Typography align="left" className={classes.itemTitle}>
                    {order.cartItems.length > 1
                      ? order.cartItems[0].productName +
                        " + " +
                        (order.cartItems.length - 1) +
                        " more item(s)"
                      : order.cartItems[0].productName}
                  </Typography>
                ) : (
                  <Typography align="left" className={classes.itemTitle}>
                    {order.retailCartItems.length > 1
                      ? order.retailCartItems[0].retailProductName +
                        " + " +
                        (order.retailCartItems.length - 1) +
                        " more item(s)"
                      : order.retailCartItems[0].retailProductName}
                  </Typography>
                )}
                <Typography align="left" className={classes.shopName}>
                  {order.shopName}
                </Typography>
                <Typography align="left" className={classes.itemOrderedDate}>
                  Ordered on : {getFormattedDate(order.date)}
                </Typography>
                <Typography align="left" className={classes.itemOrderedStatus}>
                  Order Status : {order.delStatus}
                </Typography>
                <Typography
                  align="left"
                  className={classes.itemExpectedDelivery}
                >
                  Expected Delivery: {getFormattedDate(order.expectedDate)}
                </Typography>
                {order.delStatus === "Out for Delivery" && (
                  <Grid container direction="column">
                    <Typography
                      align="left"
                      className={classes.itemDeliveryDetails}
                    >
                      Delivery Details
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
                            {order.delName}
                          </Typography>
                          <Typography className={classes.DeliveryBoyMobile}>
                            +91 {order.delPhno}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Button
                  variant="outlined"
                  className={classes.trackBtn}
                  onClick={() => handleTrackClick(order)}
                  color="secondary"
                  fullWidth
                  endIcon={<LocationOn></LocationOn>}
                >
                  Track Order
                </Button>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default ActiveOrders;
