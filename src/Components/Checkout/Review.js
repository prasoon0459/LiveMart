import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 2),
  },
  shipmentToHeading: {
    fontWeight: 600,
    margin: theme.spacing(1, 0, 0),
  },
  indOrdersContainer: {
    marginTop: theme.spacing(4),
  },
  shopNameHeading: {
    margin: theme.spacing(0, 0, 1),
    fontWeight: 600,
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
}));

function getDate(date) {
  var d = new Date(date);
  var dd = d.getDate();

  var mm = d.getMonth() + 1;
  var yyyy = d.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return dd + "/" + mm + "/" + yyyy + " " + d.getHours() + ":" + d.getMinutes();
}

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
  const shopSet = new Set();
  const [shopNames, setShopNames] = React.useState([]);
  var shopTotal = 0;

  // React.useEffect(() => {
  //   cartItems.map((cartItem) => {
  //     var temp = shopSet;
  //     temp.add(cartItem.item.shopName);
  //     setShopSet(temp);
  //   });
  // }, []);

  React.useEffect(() => {
    cartItems.map((cartItem) => {
      shopSet.add(cartItem.item.shopName);
    });
    setShopNames(Array.from(shopSet));
  }, []);

  console.log(cartItems);
  console.log(delMode);
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
              <Typography
                variant="h6"
                align="left"
                className={classes.shopNameHeading}
              >
                {shopName}
              </Typography>
              {cartItems
                .filter((product) => product.item.shopName === shopName)
                .map((cartItem) => {
                  shopTotal +=
                    cartItem.item.productPrice * cartItem.item.quantity;
                  return (
                    <Grid
                      container
                      direction="column"
                      className={classes.indOrdersContainer}
                    >
                      <Grid
                        container
                        direction="column"
                        alignItems="flex-start"
                      >
                        {delMode === "Offline" ? (
                          <div>
                            <Typography
                              align="left"
                              className={classes.shipmentToHeading}
                            >
                              {"Pickup From :"}
                            </Typography>
                            <Typography align="left">
                              {cartItem.item.shopId.address}
                            </Typography>
                          </div>
                        ) : (
                          <div></div>
                        )}
                        <Typography
                          align="left"
                          className={classes.shipmentToHeading}
                        >
                          {delMode === "Offline"
                            ? "Pickup Date: " +
                              pickUpDates[index].toLocaleDateString()
                            : "Expected Delivery : " +
                              new Date().toLocaleDateString()}{" "}
                        </Typography>
                        <Typography align="left"></Typography>
                      </Grid>
                      <Divider></Divider>
                      <List className={classes.list} disablePadding>
                        <ListItem
                          className={classes.listItem}
                          key={cartItem.item.productName}
                        >
                          <ListItemText
                            primary={cartItem.item.productName}
                            secondary={
                              cartItem.item.quantity +
                              " " +
                              cartItem.item.productId.unit
                            }
                          />
                          <Typography variant="body2">
                            {cartItem.item.productPrice *
                              cartItem.item.quantity}
                          </Typography>
                        </ListItem>
                      </List>{" "}
                    </Grid>
                  );
                })}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  {shopTotal}
                </Typography>
              </ListItem>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
