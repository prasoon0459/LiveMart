import {
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
});

const ViewPickup = () => {
  const classes = useStyles();
  const address = {
    firstName: "Prasoon",
    lastName: "Baghel",
    addressLine1: "D1103 Daljit Vihar, AWHO",
    addressLine2: "Vrindawan Awas Yojna Sector 6A, Telibagh",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zip: "226029",
    country: "INDIA",
  };
  const order = {
    id: "93GD73BDB82H",
    seller_name: "M/s Agarwal General Store",
    seller_address:
      "Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India",
    items: [
      { name: "Lifeboy Soap", variant: "100gm", quantity: 6, price: 9.99 },
      {
        name: "Kurkure Masala Munch",
        variant: "200gm",
        quantity: 4,
        price: 3.45,
      },
      {
        name: "Dettol Hand Sanitizer",
        quantity: 2,
        variant: "50ml",
        price: 6.51,
      },
    ],
    mode: "offline",
    total_price: 342.64,
    customer_name: "Prasoon Baghel",
    customer_mobile: "9133260431",
    delivery_address:
      "D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India",
    order_date: "18th March 2021",
    expected_delivery: "23/04/2021 05:00PM",
    status: 2,
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
                    <Typography align="left">{order.seller_name}</Typography>
                    <Typography align="left">{order.seller_address}</Typography>
                    <Typography
                      align="left"
                      className={classes.expDeliveryText}
                    >
                      Pickup Date :{" "}
                    </Typography>
                    <Typography align="left">
                      {order.expected_delivery}
                    </Typography>
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
                    <Typography>Order Picked Up</Typography>
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
                  {order.items.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                      <ListItemText
                        primary={product.name + " (" + product.variant + ")"}
                        secondary={product.quantity + " Nos."}
                      />
                      <Typography variant="body2">
                        $ {product.price * product.quantity}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    $ {order.total_price}
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

export default ViewPickup;
