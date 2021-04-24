import { Grid, makeStyles, Paper, Typography, Button } from "@material-ui/core";
import { ChevronRight, LocationOn, StoreOutlined } from "@material-ui/icons";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import { useHistory } from "react-router-dom";
import Imgix from "react-imgix";
import no_orders from "../../img/no_orders.svg";
import axios from "axios";
import serverUrl from "../../serverURL";
import React from "react";

const useStyles = makeStyles({
  root: {
    padding: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 3, 1),
  },
  ordersContainer: {
    padding: (props) =>
      props.sm || props.mobile
        ? theme.spacing(2, 0, 0)
        : theme.spacing(4, 5, 0),
  },
  orderPaper: {
    width: "100%",
    margin: theme.spacing(1, 1, 1),
    padding: theme.spacing(2, 2, 2),
    maxWidth: "992px",
  },
  orderItems: {
    margin: theme.spacing(2, 2, 2),
  },
  storeIcon: {
    margin: theme.spacing(0, 1, 0),
  },
  orderStatus: {
    fontSize: 18,
    letterSpacing: 1,
    margin: theme.spacing(1, 0, 1),
  },
  orderStatusItem: {
    flexGrow: 1,
  },
  orderDeliveryDate: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 600,
    margin: theme.spacing(0, 1, 1),
  },
  orderTotalPrice: {
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 500,
    margin: theme.spacing(0, 1, 1),
  },
  title: {
    fontWeight: 500,
    letterSpacing: 2,
    margin: (props) =>
      props.mobile ? theme.spacing(2, 1, 2) : theme.spacing(2, 2, 1),
    padding: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
  },

  emptyOrdersText: {
    letterSpacing: 2,
    color: theme.palette.text.hint,
    margin: theme.spacing(4, 2, 2),
  },
});

function getStatus(status) {
  switch (status) {
    case 0:
      return "Order Placed";
    case 1:
      return "Order Packed";
    case 2:
      return "Out for Delivery";
    case 3:
      return "Delivered";
    default:
      return "UNKNOWN_STATUS";
  }
}

const Orders = () => {
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const classes = useStyles({ mobile: mobile, sm: sm });
  const history = useHistory();
  const [transactions, setTransactions] = React.useState([]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");

  const getTransactions = () => {
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
        // console.log(JSON.stringify(response.data));
        const len = response.data.length;
        var new_items = [];
        for (var i = 0; i < len; i++) {
          var temp = [...new_items];
          temp = [...temp, { item: response.data[i] }];
          new_items = temp;
        }
        setTransactions(new_items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    try {
      getTransactions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTrackClick = (order) => {
      history.push({
        pathname: "/track",
        order: order.item,
      })
  };
  const handleViewClick = (order) => {
      history.push({
        pathname: "/my_pickup",
        order: order.item,
      });
  };

  return (
    <div className={classes.root}>
      {console.log(transactions)}
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.root}
      >
        <Typography
          variant={mobile ? "h6" : "h5"}
          align="left"
          className={classes.title}
        >
          My Orders
        </Typography>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.ordersContainer}
        >
          {transactions.map((order) => (
            <Paper className={classes.orderPaper}>
              <Grid container alignItems="center" direction="row">
                <Grid item className={classes.orderStatusItem}>
                  <Typography className={classes.orderStatus} align="left">
                    {order.item.mode === "Online"
                      ? order.item.delStatus // getStatus
                      : "Offline Pickup"}
                  </Typography>
                </Grid>
                <Button
                  color="secondary"
                  onClick={order.mode==='Online'? () => handleTrackClick(order) : ()=> handleViewClick(order)}
                  endIcon={
                    order.item.mode === "Online" ? (
                      <LocationOn></LocationOn>
                    ) : (
                      <ChevronRight></ChevronRight>
                    )
                  }
                  variant="outlined"
                >
                  {order.item.mode === "Online"
                    ? "Track Your Order"
                    : "View your Order"}
                </Button>
              </Grid>
              <Grid container direction="row" width="100%">
                <StoreOutlined className={classes.storeIcon}></StoreOutlined>
                <Grid item>
                  <Typography className={classes.orderStoreName}>
                    {order.item.shopName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.orderItems} direction="column">
                <Grid item>
                  {user_type === "1"
                    ? order.item.cartItems.map((item) => (
                        <Typography align="left">
                          {item.productName +
                            " - " +
                            item.quantity +
                            " " +
                            item.productId.unit}
                        </Typography>
                      ))
                    : order.item.retailCartItems.map((item) => (
                        <Typography align="left">
                          {item.retailProductName +
                            " - " +
                            item.quantity +
                            " " +
                            item.retailProductId.productId.unit}
                        </Typography>
                      ))}
                </Grid>
              </Grid>
              <Grid container direction="row" alignItems="center">
                {order.item.mode === "Online" ? (
                  <Grid item xs={12} sm={6}>
                    <Typography
                      className={classes.orderDeliveryDate}
                      align="left"
                    >
                      Delivery Date:{" "}
                      {new Date(order.item.expectedDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                ) : <Grid item xs={6}>
                  <div></div>
                  </Grid>}
                <Grid item xs={12} sm={6}>
                  <Typography className={classes.orderTotalPrice} align="right">
                    Total Price: $ {order.item.total_amount}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
          {transactions.length === 0 && (
            <Grid container direction="column" alignItems="center">
              <Imgix
                src={no_orders}
                width="400"
                height="400"
                imgixParams={{
                  fit: "fit",
                  fm: "svg",
                }}
              />
              <Typography className={classes.emptyOrdersText} variant="h5">
                Your don't have any orders to show.{" "}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Orders;
