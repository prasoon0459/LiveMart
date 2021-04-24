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
import Avatar from "../../img/deliveryBoyAvatar.svg";
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
  itemOrderedBy: {
    // color:theme.palette.text.hint,
    margin: theme.spacing(2, 1, 0),
  },
  itemPickupTime: {
    // color:theme.palette.text.hint,
    margin: theme.spacing(0, 1, 2),
  },
  itemOrderID: {
    // color:theme.palette.text.hint,
    margin: theme.spacing(0, 1, 0),
  },
  customerDetailsContainer: {
    margin: theme.spacing(1, 1, 2),
  },
  customerContact: {
    margin: theme.spacing(0, 1, 0),
  },
  CustomerMobile: {
    margin: theme.spacing(0, 1, 0),
  },
  CustomerName: {
    margin: theme.spacing(0, 1, 0),
  },
  CustomerDetailsHeading: {
    fontWeight: 500,
  },
});

const Pickups = () => {
  const history = useHistory();
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const classes = useStyles({ mobile: mobile, sm: sm });
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const user_type = localStorage.getItem("usertype");
  const [transactions, setTransactions] = React.useState([]);

  const getPickupTransactions = () => {
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
      getPickupTransactions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const orders = [
  //     {
  //         id:'93GD73BDB82H',
  //         seller_name: 'M/s Agarwal General Store',
  //         items: [
  //             { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
  //             { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
  //             { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
  //         ],
  //         total_price: 342.64,
  //         customer_name:'Prasoon Baghel',
  //         customer_mobile:'9133260431',
  //         delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
  //         order_date: '18th March 2021',
  //         expected_delivery: '23rd March 2021',
  //         status: 2
  //     },
  //     {
  //         id:'93GD73BDB82H',
  //         seller_name: 'M/s Agarwal General Store',
  //         items: [
  //             { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
  //             { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
  //             { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
  //         ],
  //         total_price: 342.64,
  //         customer_name:'Prasoon Baghel',
  //         customer_mobile:'9133260431',
  //         delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
  //         order_date: '18th March 2021',
  //         expected_delivery: '23rd March 2021',
  //         status: 2
  //     },
  //     {
  //         id:'93GD73BDB82H',
  //         seller_name: 'M/s Agarwal General Store',
  //         items: [
  //             { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
  //             { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
  //             { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
  //         ],
  //         total_price: 342.64,
  //         customer_name:'Prasoon Baghel',
  //         customer_mobile:'+919133260431',
  //         delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
  //         order_date: '18th March 2021',
  //         expected_delivery: '23rd March 2021',
  //         status: 2
  //     },
  //     {
  //         id:'93GD73BDB82H',
  //         seller_name: 'M/s Agarwal General Store',
  //         items: [
  //             { name: "Lifeboy Soap", variant: '100gm', quantity: 6, price: 9.99 },
  //             { name: "Kurkure Masala Munch", variant: '200gm', quantity: 4, price: 3.45 },
  //             { name: "Dettol Hand Sanitizer", quantity: 2, variant: '50ml', price: 6.51 },
  //         ],
  //         total_price: 342.64,
  //         customer_name:'Prasoon Baghel',
  //         customer_mobile:'9133260431',
  //         delivery_address:'D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India',
  //         order_date: '18th March 2021',
  //         expected_delivery: '23rd March 2021',
  //         status: 2
  //     },

  // ]

  const handlePickupClick = (order) => {
    history.push({
      pathname: "/pickup",
      order: order.item,
    });
  };

  return (
    <div className={classes.root}>
      <Typography
        variant={mobile ? "h6" : "h5"}
        align="left"
        className={classes.title}
      >
        Pickups Scheduled for Today
      </Typography>
      <Grid container direction="row">
        {transactions.length > 0 ? (
          transactions
            .filter((transaction) => "Offline" === transaction.item.mode)
            .map((order) => (
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Paper elevation={3} className={classes.itemRoot}>
                  <Grid container direction="column">
                    {user_type === "1" ? (
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
                    ) : (
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
                    )}
                    <Typography
                      align="left"
                      className={classes.itemOrderedDate}
                    >
                      Ordered on :{" "}
                      {new Date(order.item.date).toLocaleDateString()}
                    </Typography>
                    <Typography align="left" className={classes.itemOrderID}>
                      Order ID : {order.item.id}
                    </Typography>
                    {/* <Typography align="left" className={classes.itemPickupTime}>
                      Pickup : {order.expected_delivery}
                    </Typography> */}
                    {/* <Typography
                      variant="subtitle1"
                      align="left"
                      className={classes.CustomerDetailsHeading}
                    >
                      Customer Details
                    </Typography> */}
                    {/* <Grid
                      className={classes.customerDetailsContainer}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      <ReactRoundedImage
                        image={Avatar}
                        imageWidth="40"
                        imageHeight="40"
                        roundedSize={1}
                      ></ReactRoundedImage>
                      <Grid item>
                        <Grid
                          container
                          direction="column"
                          className={classes.customerContact}
                        >
                          <Typography
                            align="left"
                            className={classes.CustomerName}
                          >
                            {order.customer_name}
                          </Typography>
                          <Typography
                            align="left"
                            className={classes.CustomerMobile}
                          >
                            {order.customer_mobile}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handlePickupClick(order)}
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
export default Pickups;
