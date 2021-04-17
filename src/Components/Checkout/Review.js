import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Orders from "../Order/Orders";
import { Divider } from "@material-ui/core";

const orders = [
    {
        shopName: 'M/s Agarwal General Store',
        items:[
            { name: "Product 1", desc: "A nice thing", price: "$9.99" },
            { name: "Product 2", desc: "Another thing", price: "$3.45" },
            { name: "Product 3", desc: "Something else", price: "$6.51" },
        ]
    },
    {
        shopName: 'M/s Gowani General Store',
        items:[
            { name: "Product 4", desc: "A nice thing", price: "$9.99" },
            { name: "Product 5", desc: "Another thing", price: "$3.45" },
        ]
    },

]
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 2),
  },
  shipmentToHeading:{
    fontWeight:600
  },
  indOrdersContainer:{
    marginTop:theme.spacing(4)
  },
  shopNameHeading:{
    margin:theme.spacing(0,0,1),
    fontWeight:400
  },
  orderSummaryHeading:{
    margin:theme.spacing(2,0,0)
  },
  list:{
      margin:theme.spacing(1,0,1)
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review({ address }) {
  const classes = useStyles();
  return (
    <React.Fragment>
        <Grid container direction='column' alignItems='flex-start'>
            <Typography align='left' className={classes.shipmentToHeading}>Shipment to:</Typography>
            <Typography align='left'>{address.firstName+ ' ' + address.lastName}</Typography>
            <Typography align='left'>{address.addressLine1}</Typography>
            <Typography align='left'>{address.addressLine2}</Typography>
            <Typography align='left'>{address.city+', '+address.state}</Typography>
            <Typography align='left'>{address.zip+', '+address.country}</Typography>
        </Grid>
      <Typography variant="h6" gutterBottom className={classes.orderSummaryHeading}>
        Order Summary
      </Typography>
      {orders.map((order)=>(
          <Grid container direction='column' className={classes.indOrdersContainer}>
              <Typography variant='h6' align='left' className={classes.shopNameHeading}>{order.shopName}</Typography>
              <Divider></Divider>
              <List className={classes.list} disablePadding>
                {order.items.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText primary={product.name} secondary={product.desc} />
                        <Typography variant="body2">{product.price}</Typography>
                    </ListItem>
                ))}
              </List>
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                    $34.06
                </Typography>
              </ListItem>
          </Grid>
      ))}

    </React.Fragment>
  );
}
