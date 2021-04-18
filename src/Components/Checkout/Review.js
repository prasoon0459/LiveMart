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
    margin: theme.spacing(1, 0, 0)
  },
  indOrdersContainer: {
    marginTop: theme.spacing(4)
  },
  shopNameHeading: {
    margin: theme.spacing(0, 0, 1),
    fontWeight: 600
  },
  orderSummaryHeading: {
    margin: theme.spacing(2, 0, 0)
  },
  list: {
    margin: theme.spacing(1, 0, 1)
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function getDate(date) {
  var d = new Date(date)
  var dd = d.getDate();

  var mm = d.getMonth() + 1;
  var yyyy = d.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd+'/'+mm+'/'+yyyy+' '+d.getHours()+':'+d.getMinutes()
}

export default function Review({ orders, option, address, }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className={classes.orderSummaryHeading}>
        Order Summary
      </Typography>
      {orders.map((order) => (
        <Grid container direction='column' className={classes.indOrdersContainer}>
          <Typography variant='h6' align='left' className={classes.shopNameHeading}>{order.seller_name}</Typography>
          <Grid container direction='column' alignItems='flex-start'>
            {option==='1'?<div>
                <Typography align='left' className={classes.shipmentToHeading}>{'Pickup From :'}</Typography>
                <Typography align='left'>{order.seller_address}</Typography>
            </div> : <div></div>}
            <Typography align='left' className={classes.shipmentToHeading}>{(option==='1'?'Pickup Date: ':'Expected Delivery :') + getDate(order.expected_delivery)} </Typography>
            <Typography align='left'></Typography>
          </Grid>
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
