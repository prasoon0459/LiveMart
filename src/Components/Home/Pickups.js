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
      props.mobile ? theme.spacing(1,0,1) : theme.spacing(1,0,1),
    padding: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
  },
  btn:{
    margin:theme.spacing(2,0,0)
  },
  itemTitle: {
    fontWeight: 600,
    fontSize: 18
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
        console.log('pickups',JSON.stringify(response.data));
        const len = response.data.length;
        var new_items = [];
        for (var i = 0; i < len; i++) {
          if(response.data[i].mode==='Offline'){
            if(response.data[i].delStatus==='Order Placed'){
              new_items.push(response.data[i])
            }
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
      getPickupTransactions();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePickupClick = (order) => {
    history.push({
      pathname: "/pickup",
      order: order,
    });
  };

  return transactions.length>0?(
    <div className={classes.root}>
      <Typography
        variant={mobile ? "h6" : "h5"}
        align="center"
        className={classes.title}
      >
        Pickups Scheduled
      </Typography>
      <Grid container direction="row">
        {transactions.length > 0 ? (
          transactions
            .map((order) => (
              <Grid item lg={3} md={4} sm={6} xs={12}>

                {console.log('orderpickup', order)}
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
                        {order.cartItems[0].productName}
                        {order.cartItems.length - 1 !== 0
                          ? " and " +
                            (order.cartItems.length - 1).toString() +
                            " item(s) more"
                          : " "}
                      </Typography>
                    )}
                    <Typography
                      align="left"
                      className={classes.itemOrderedDate}
                    >
                      Ordered on :{" "}
                      {new Date(order.date).toLocaleDateString()}
                    </Typography>
                    <Typography align="left" className={classes.itemOrderID}>
                      Order ID : {order.id}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handlePickupClick(order)}
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
          <CircularProgress />
        )}
      </Grid>
    </div>
  ): (<div></div>);
};
export default Pickups;
