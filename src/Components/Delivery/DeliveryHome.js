/* eslint-disable */

import {
  Grid,
  makeStyles,
  Paper,
  Typography,
  Button,
  AppBar,
  Tabs,
  Tab,
  Box,
  Toolbar,
  Icon,
  IconButton,
} from "@material-ui/core";
import theme from "../../theme";
import SwipeableViews from "react-swipeable-views";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
// import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
// import { dummy_orders } from "../Order/dummyorders";
import { CheckSharp } from "@material-ui/icons";
import Imgix from "react-imgix";
import no_orders from "../../img/no_orders.svg";
import no_data from "../../img/no_data.svg";
import axios from "axios";
import serverUrl from "../../serverURL";

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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  paper: {
    margin: theme.spacing(0, 0),
    // maxWidth: "992px",
    width: "100%",
  },
  itemPaper: {
    width: "100%",
    maxWidth: "992px",
    margin: theme.spacing(1, 0, 1),
    padding: theme.spacing(2, 2, 2),
  },
  flexGrow: {
    flexGrow: 1,
  },
  customerName: {
    fontWeight: 600,
  },
  fullWidth: {
    width: "100%",
  },
  orderID: {
    fontWeight: 600,
  },
  orderIDcontainer: {
    margin: theme.spacing(2, 0, 0),
  },
  mobileNo: {
    margin: theme.spacing(2, 0, 0),
  },

  emptyOrdersText: {
    letterSpacing: 2,
    color: theme.palette.text.hint,
    margin: theme.spacing(4, 2, 2),
  },
});

const DeliveryHome = ({ handleLogout }) => {
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const classes = useStyles({ mobile: mobile, sm: sm });
  // const history = useHistory();
  const [transactions, setTransactions] = React.useState([]);
  const [retailTransactions, setRetailTransactions] = React.useState([]);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [tab_value, setTabValue] = React.useState(0);
  //const [orders, setOrders] = React.useState(dummy_orders);
  // const [delivered_orders, setDeliveredOrders] = React.useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setTabValue(index);
  };

  const handleLogoutClick = () => {
    handleLogout(history);
  };

  const handleTransactionClick = (order) => {
    var data = JSON.stringify({
      id: order.item.id,
    });
    var config = {
      method: "post",
      url: serverUrl + "/delivered_transaction/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var new_items = transactions.filter(
          (product) => product.item.delStatus === "Out for Delivery"
        );
        setTransactions(new_items);
        console.log(transactions);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRetailTransactionClick = (order) => {
    var data = JSON.stringify({
      id: order.item.id,
    });
    var config = {
      method: "post",
      url: serverUrl + "/delivered_retail_transaction/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        var new_items = retailTransactions.filter(
          (product) => product.item.delStatus === "Out for Delivery"
        );
        retailTransactions(new_items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getRetailTransactionDetails = () => {
    var config = {
      method: "get",
      url: serverUrl + "/retail_transactions/?d=" + username,
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const len = response.data.length;
        var new_items = [];
        for (var i = 0; i < len; i++) {
          if (
            response.data[i].delStatus === "Out for Delivery" ||
            response.data[i].delStatus === "Delivered"
          ) {
            var temp = [...new_items];
            temp = [...temp, { item: response.data[i] }];
            new_items = temp;
          }
        }
        setRetailTransactions(new_items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTransactionDetails = () => {
    var config = {
      method: "get",
      url: serverUrl + "/transactions/?d=" + username,
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        const len = response.data.length;
        var new_items = [];
        for (var i = 0; i < len; i++) {
          if (
            response.data[i].delStatus === "Out for Delivery" ||
            response.data[i].delStatus === "Delivered"
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
      getTransactionDetails();
      getRetailTransactionDetails();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.root}
    >
      <AppBar elevation={0} position="static">
        <Toolbar className={classes.toolbar}>
          <Grid
            container
            fullWidth
            className={classes.fullWidth}
            direction="row-reverse"
          >
            <Grid item className={classes.flexGrow}>
              <Grid container direction="row-reverse">
                <Button onClick={handleLogoutClick} color="inherit">
                  Logout
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h5">LiveMart</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {console.log(transactions)}
      {/* <Paper className={classes.paper}> */}
      <Grid container direction="column" className={classes.paper}>
        <AppBar elevation={0} position="static">
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
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.toDeliverRoot}
            >
              {transactions.filter(
                (transaction) =>
                  transaction.item.delStatus === "Out for Delivery"
              ).length !== 0 && (
                <Typography align="center" className={classes.customerName}>
                  Wholesale Orders
                </Typography>
              )}
              {transactions
                .filter(
                  (transaction) =>
                    transaction.item.delStatus === "Out for Delivery"
                )
                .map((order, index) => (
                  <Paper className={classes.itemPaper}>
                    <Grid container direction="column">
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.flexGrow}>
                          <Typography
                            align="left"
                            className={classes.customerName}
                          >
                            {order.item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleTransactionClick(order)}
                            endIcon={<CheckSharp></CheckSharp>}
                          >
                            Mark Delivered
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="left">
                          {order.item.deliveryAddress}
                        </Typography>
                        <Typography align="left" className={classes.mobileNo}>
                          {"Mobile No. : +91" + order.item.phno}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className={classes.orderIDcontainer}
                      >
                        <Grid item>
                          <Typography align="left" className={classes.orderID}>
                            Order ID :{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="left">
                            {"#" + order.item.id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              {retailTransactions.filter(
                (transaction) =>
                  transaction.item.delStatus === "Out for Delivery"
              ).length !== 0 && (
                <Typography align="center" className={classes.customerName}>
                  Retail Orders
                </Typography>
              )}
              {retailTransactions
                .filter(
                  (transaction) =>
                    transaction.item.delStatus === "Out for Delivery"
                )
                .map((order, index) => (
                  <Paper className={classes.itemPaper}>
                    <Grid container direction="column">
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.flexGrow}>
                          <Typography
                            align="left"
                            className={classes.customerName}
                          >
                            {order.item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleRetailTransactionClick(order)}
                            endIcon={<CheckSharp></CheckSharp>}
                          >
                            Mark Delivered
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="left">
                          {order.item.deliveryAddress}
                        </Typography>
                        <Typography align="left" className={classes.mobileNo}>
                          {"Mobile No. : +91" + order.item.phno}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className={classes.orderIDcontainer}
                      >
                        <Grid item>
                          <Typography align="left" className={classes.orderID}>
                            Order ID :{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="left">
                            {"#" + order.item.id}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              {transactions.filter(
                (transaction) =>
                  transaction.item.delStatus === "Out for Delivery"
              ).length +
                retailTransactions.filter(
                  (transaction) =>
                    transaction.item.delStatus === "Out for Delivery"
                ).length ===
                0 && (
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
                    You don't have any orders to Deliver.{" "}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={tab_value} index={1} dir={theme.direction}>
            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.toDeliverRoot}
            >
              {transactions.filter(
                (transaction) => transaction.item.delStatus === "Delivered"
              ).length !== 0 && (
                <Typography align="center" className={classes.customerName}>
                  Wholesale Orders
                </Typography>
              )}
              {transactions
                .filter(
                  (transaction) => transaction.item.delStatus === "Delivered"
                )
                .map((order, index) => (
                  <Paper className={classes.itemPaper}>
                    <Grid container direction="column">
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.flexGrow}>
                          <Typography
                            align="left"
                            className={classes.customerName}
                          >
                            {order.item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            disabled
                            color="primary"
                            // onClick={() => handleDeliveredClick(index)}
                            endIcon={<CheckSharp></CheckSharp>}
                          >
                            Delivered
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="left">
                          {order.item.deliveryAddress}
                        </Typography>
                        <Typography align="left" className={classes.mobileNo}>
                          {"Mobile No. : +91" + order.item.phno}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className={classes.orderIDcontainer}
                      >
                        <Grid item>
                          <Typography align="left" className={classes.orderID}>
                            Order ID :{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="left">{order.item.id}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}

              {retailTransactions.filter(
                (transaction) => transaction.item.delStatus === "Delivered"
              ).length !== 0 && (
                <Typography align="center" className={classes.customerName}>
                  Retail Orders
                </Typography>
              )}
              {retailTransactions
                .filter(
                  (transaction) => transaction.item.delStatus === "Delivered"
                )
                .map((order, index) => (
                  <Paper className={classes.itemPaper}>
                    <Grid container direction="column">
                      <Grid container direction="row" alignItems="center">
                        <Grid item className={classes.flexGrow}>
                          <Typography
                            align="left"
                            className={classes.customerName}
                          >
                            {order.item.name}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="outlined"
                            disabled
                            color="primary"
                            // onClick={() => handleDeliveredClick(index)}
                            endIcon={<CheckSharp></CheckSharp>}
                          >
                            Delivered
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align="left">
                          {order.item.deliveryAddress}
                        </Typography>
                        <Typography align="left" className={classes.mobileNo}>
                          {"Mobile No. : +91" + order.item.phno}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        className={classes.orderIDcontainer}
                      >
                        <Grid item>
                          <Typography align="left" className={classes.orderID}>
                            Order ID :{" "}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography align="left">{order.item.id}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              {retailTransactions.filter(
                (transaction) => transaction.item.delStatus === "Delivered"
              ).length +
                transactions.filter(
                  (transaction) => transaction.item.delStatus === "Delivered"
                ).length ===
                0 && (
                <Grid container direction="column" alignItems="center">
                  <Imgix
                    src={no_data}
                    width="300"
                    height="300"
                    imgixParams={{
                      fit: "fit",
                      fm: "svg",
                    }}
                  />
                  <Typography className={classes.emptyOrdersText} variant="h5">
                    Your have no retail deliveries to show.{" "}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </Grid>
      {/* </Paper> */}
    </Grid>
  );
};

export default DeliveryHome;
