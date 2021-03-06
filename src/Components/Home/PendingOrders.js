/* eslint-disable */

import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";
import ReactRoundedImage from "react-rounded-image";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import deliveryBoyAvatar from "../../img/deliveryBoyAvatar.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../serverURL";
import React from "react";
import Imgix from "react-imgix";
import no_orders from "../../img/no_orders.svg";

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
      props.mobile ? theme.spacing(1, 0, 1) : theme.spacing(1, 0, 1),
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
  btn: {
    margin: theme.spacing(2, 0, 0),
  },
  itemOrderedID: {
    fontSize: 16,
    margin: theme.spacing(0, 1, 0),
  },
  emptyOrdersText: {
    letterSpacing: 2,
    color: theme.palette.text.hint,
    margin: theme.spacing(4, 2, 2),
  },
});

const PendingOrders = () => {
  const history = useHistory();
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const classes = useStyles({ mobile: mobile, sm: sm });
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");
  const [transactions, setTransactions] = React.useState([]);
  //   const orders = [1, 2, 3, 4];

  const handleOrderOpen = (order) => {
    //   history.push({
    //   pathname: "/checkout",
    //   cartItems: items,
    //   totalPrice: total_cost + 50,
    // });
    console.log("order", order);
    history.push({ pathname: "/seller_view_order", order: order.item });
  };
  const getPendingTransactions = () => {
    var config = {};
    if (user_type === "1") {
      config = {
        method: "get",
        url: serverUrl + "/retail_transactions/?s=" + username,
        headers: {
          Authorization: "JWT " + token,
        },
      };
    } else if (user_type === "2") {
      config = {
        method: "get",
        url: serverUrl + "/transactions/?s=" + username,
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
          if (
            (response.data[i].delStatus === "Order Placed" ||
              response.data[i].delStatus === "Packed" ||
              response.data[i].delStatus === "Out for Delivery") &&
            response.data[i].mode === "Online"
          ) {
            var temp = [...new_items];
            temp = [...temp, { item: response.data[i] }];
            new_items = temp;
          }
        }
        setTransactions(new_items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  React.useEffect(() => {
    try {
      getPendingTransactions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={classes.root}>
      {console.log(transactions)}
      <Typography
        variant={mobile ? "h6" : "h5"}
        align="center"
        className={classes.title}
      >
        Pending Orders
      </Typography>
      <Grid container direction="row">
        {transactions.length > 0 ? (
          transactions.map((order) => (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Paper elevation={3} className={classes.itemRoot}>
                <Grid container direction="column">
                  {user_type === "2" ? (
                    <Typography
                      variant="body1"
                      align="left"
                      className={classes.itemTitle}
                    >
                      {order.item.cartItems[0].productName}
                      {order.item.cartItems.length - 1 !== 0
                        ? " and " +
                          (order.item.cartItems.length - 1).toString() +
                          " more item(s)"
                        : " "}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      align="left"
                      className={classes.itemTitle}
                    >
                      {order.item.retailCartItems[0].retailProductName}
                      {order.item.retailCartItems.length - 1 !== 0
                        ? " and " +
                          (order.item.retailCartItems.length - 1).toString() +
                          " more item(s)"
                        : " "}
                    </Typography>
                  )}
                  <Typography align="left" className={classes.itemOrderedDate}>
                    Ordered on :{" "}
                    {new Date(order.item.date).toLocaleDateString()}
                  </Typography>
                  <Typography
                    align="left"
                    variant="caption"
                    className={classes.itemOrderedID}
                  >
                    Order ID : {order.item.id}
                  </Typography>
                  <Typography
                    align="left"
                    className={classes.itemOrderedStatus}
                  >
                    Order Status : {order.item.delStatus}
                  </Typography>
                  <Typography
                    align="left"
                    className={classes.itemExpectedDelivery}
                  >
                    Expected Delivery:{" "}
                    {new Date(order.item.expectedDate).toLocaleDateString()}
                  </Typography>
                  {order.item.delStatus === "Out for Delivery" && (
                    <Grid
                      className={classes.deliveryPersonDetails}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      {console.log("Asdasd")}
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
                            {order.item.delName}
                          </Typography>
                          <Typography className={classes.DeliveryBoyMobile}>
                            +91 {order.item.delPhno}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => handleOrderOpen(order)}
                    color="secondary"
                    fullWidth
                    className={classes.btn}
                    endIcon={<ChevronRight></ChevronRight>}
                  >
                    View Order
                  </Button>
                </Grid>
              </Paper>
            </Grid>
          ))
        ) : (
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
              You don't have any pending orders.{" "}
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
export default PendingOrders;
