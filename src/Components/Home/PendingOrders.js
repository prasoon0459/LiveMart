import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { ChevronRight, LocationOn } from "@material-ui/icons";
import ReactRoundedImage from "react-rounded-image";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import deliveryBoyAvatar from "../../img/deliveryBoyAvatar.svg";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../serverURL";
import React from "react";

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
            response.data[i].delStatus === "Order Placed" ||
            response.data[i].delStatus === "Packed" ||
            response.data[i].delStatus === "Out for Delivery"
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
        align="left"
        className={classes.title}
      >
        PENDING ORDERS
      </Typography>
      <Grid container direction="row">
        {transactions.length > 0 ? (
          transactions
            .filter((transaction) => "Online" === transaction.item.mode)
            .map((order) => (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Paper elevation={3} className={classes.itemRoot}>
                  <Grid container direction="column">
                    {user_type === "2" ? (
                      <Typography
                        variant="h6"
                        align="left"
                        className={classes.itemTitle}
                      >
                        {order.item.cartItems[0].productName}
                        {order.item.cartItems.length - 1 !== 0
                          ? " and " +
                            (order.item.cartItems.length - 1).toString() +
                            " item(s) more"
                          : " "}
                      </Typography>
                    ) : (
                      <Typography
                        variant="h6"
                        align="left"
                        className={classes.itemTitle}
                      >
                        {order.item.retailCartItems[0].retailProductName}
                        {order.item.retailCartItems.length - 1 !== 0
                          ? " and " +
                            (order.item.retailCartItems.length - 1).toString() +
                            " item(s) more"
                          : " "}
                      </Typography>
                    )}
                    <Typography
                      align="left"
                      className={classes.itemOrderedDate}
                    >
                      Ordered on :{" "}
                      {new Date(order.item.date).toLocaleDateString()}
                    </Typography>
                    <Typography
                      align="left"
                      variant="caption"
                      className={classes.itemOrderedStatus}
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
                      endIcon={<ChevronRight></ChevronRight>}
                    >
                      View Order
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            ))
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </div>
  );
};
export default PendingOrders;
