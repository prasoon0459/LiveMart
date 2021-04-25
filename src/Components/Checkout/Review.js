/* eslint-disable */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import { StoreOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 1),
  },
  shopName: {
    margin: theme.spacing(1, 0, 0),
  },
  shipmentToHeading: {
    margin: theme.spacing(1, 0, 0),
  },
  indOrdersContainer: {
    marginTop: theme.spacing(0),
  },
  shopNameHeading: {
    margin: theme.spacing(0, 0, 2),
    fontWeight: 600,
  },
  oneShopCont: {
    margin: theme.spacing(0, 0, 1),
  },
  orderSummaryHeading: {
    margin: theme.spacing(2, 0, 0),
  },
  storeIcon: {
    margin: theme.spacing(0, 1, 0),
  },
  list: {
    margin: theme.spacing(0, 0, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  shopContent:{
    padding:theme.spacing(0,3,0)
  },
  totalPriceCont:{
    padding:theme.spacing(0,2,0)
  }
}));

// function getDate(date) {
//   var d = new Date(date);
//   var dd = d.getDate();

//   var mm = d.getMonth() + 1;
//   var yyyy = d.getFullYear();
//   if (dd < 10) {
//     dd = "0" + dd;
//   }
//   if (mm < 10) {
//     mm = "0" + mm;
//   }
//   return dd + "/" + mm + "/" + yyyy + " " + d.getHours() + ":" + d.getMinutes();
// }

export default function Review({
  cartItems,
  delMode,
  delAddress,
  totalPrice,
  handleShopNames,
  pickUpDates,
}) {
  const classes = useStyles();
  // const [shopSet, setShopSet] = React.useState(new Set());
  const [shopNames, setShopNames] = React.useState([]);
  const [shopAddresses, setShopAddresses] = React.useState([]);
  var shopTotal = 0;
  const user_type = localStorage.getItem("usertype");
  var date = new Date();
  date.setDate(date.getDate() + 2);
  console.log(pickUpDates);
  // React.useEffect(() => {
  //   cartItems.map((cartItem) => {
  //     var temp = shopSet;
  //     temp.add(cartItem.item.shopName);
  //     setShopSet(temp);
  //   });
  // }, []);

  React.useEffect(() => {
    console.log("cartItems", cartItems);
    var shopnames = [],
      shopadd = [];
    for (var i = 0; i < cartItems.length; i++) {
      if (!shopnames.includes(cartItems[i].item.shopName)) {
        shopnames.push(cartItems[i].item.shopName);
        shopadd.push(cartItems[i].item.shopId.address);
      }
    }
    setShopNames(shopnames);
    setShopAddresses(shopadd);
  }, []);

  console.log(cartItems);
  console.log(delMode);
  console.log("shopNames", shopNames);
  console.log("shopAdd", shopAddresses);
  return (
    <React.Fragment>
      {shopNames.length > 0 ? handleShopNames(shopNames) : null}
      <Grid container direction="column">
        <Typography
          variant="h6"
          gutterBottom
          className={classes.orderSummaryHeading}
        >
          Order Summary
        </Typography>
        {shopNames.map((shopName, index) => {
          shopTotal = 0;
          return (
            <React.Fragment>
              <Grid
                container
                direction="row"
                width="100%"
                className={classes.shopName}
              >
                <StoreOutlined className={classes.storeIcon}></StoreOutlined>
                <Grid item>
                  <Typography
                    align="left"
                    variant="h6"
                    className={classes.shopNameHeading}
                  >
                    {shopName}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container direction='column' className={classes.shopContent}>
                <Grid item>
                  <Grid container direction='column'>
                    {delMode === "Offline" ? (
                      <div>
                        <Typography
                          align="left"
                          className={classes.shipmentToHeading}
                        >
                          {"Pickup From :"}
                        </Typography>
                        <Typography align="left">{shopAddresses[index]}</Typography>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <Typography align="left" className={classes.shipmentToHeading}>
                      {delMode === "Offline"
                        ? "Pickup Date: " + pickUpDates[index].toLocaleDateString()
                        : "Expected Delivery : " + date.toLocaleDateString()}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    className={classes.oneShopCont}
                  >

                    <Divider></Divider>
                    {cartItems
                      .filter((product) => product.item.shopName === shopName)
                      .map((cartItem) => {
                        shopTotal +=
                          user_type === "1"
                            ? cartItem.item.productPrice * cartItem.item.quantity
                            : cartItem.item.retailProductPrice *
                              cartItem.item.quantity;
                        return (
                          <Grid
                            container
                            direction="column"
                            className={classes.indOrdersContainer}
                          >
                            <List className={classes.list} disablePadding>
                              <ListItem
                                className={classes.listItem}
                                key={cartItem.item.id}
                              >
                                {user_type === "0" ? (
                                  <ListItemText
                                    primary={cartItem.item.retailProductName}
                                    secondary={
                                      cartItem.item.quantity +
                                      " x " +
                                      cartItem.item.retailProductId.productId.unit
                                    }
                                  />
                                ) : (
                                  <ListItemText
                                    primary={cartItem.item.productName}
                                    secondary={
                                      cartItem.item.quantity +
                                      " x " +
                                      cartItem.item.productId.unit
                                    }
                                  />
                                )}
                                <Typography variant="body2">
                                  {"₹ " +
                                    (user_type === "1"
                                      ? cartItem.item.productPrice *
                                        cartItem.item.quantity
                                      : cartItem.item.retailProductPrice *
                                        cartItem.item.quantity)}
                                  {/* {cartItem.item.productPrice *
                                    cartItem.item.quantity} */}
                                </Typography>
                              </ListItem>
                            </List>{" "}
                          </Grid>
                        );
                      })}
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className={classes.totalPriceCont} direction='column'>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    {"₹ " + shopTotal}
                  </Typography>
                </ListItem>
              </Grid>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
