import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Paper ,Avatar} from "@material-ui/core";
import Order from '../../img/order.jfif';
import Review from '../../img/review.jfif';
import Wallet from '../../img/wallet.jfif';
import Coin from '../../img/coins.jfif';
import ReactRoundedImage from 'react-rounded-image'
import Avat from '../../img/avatar.jpg';
const useStyles = makeStyles((theme) => ({
  roots :{
      margin:`calc(1em + ${theme.spacing(1)}px)`,
  },
  paper:{
    height:'100vh',
    flex:'0',
  //   [theme.breakpoints.down("sm")]: {
  //     width: "12vh",
  //  },
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(15),
    height: theme.spacing(15),
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      height:"auto"
  },
},
  text:{
      padding:theme.spacing(2),
      margin:theme.spacing(0,0,3,3),
      backgroundImage: `url(${Coin})`,
      height:'20vh',
      // [theme.breakpoints.down("sm")]: {
      //   marginLeft: theme.spacing(1),
      //   height:"auto"
      // },
  },
  roundedImage:{
    margin:theme.spacing(2)
  },
  left:{
    padding:theme.spacing(1),
    textAlign:'left'
  }
}));

export default function Profile() {
  const classes = useStyles();
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.roots}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2} direction="column" justify='flex-start' alignItems='baseline' className={classes.left}>
                    <Grid item xs={12}>
                      <Avatar alt="Harsh Heda" src={Avat} className={classes.avatar} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Name: John Doe</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Contact No: 0123456789</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>Address: BITS PILANI HYDERABAD CAMPUS</Typography>
                    </Grid>
                  </Grid>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <Grid item container className={classes.text} xs={12} spacing={3} justify='center' alignItems='center'>
                    <Typography component='h1' variant='h6'>Wallet Balance: $10</Typography>
                </Grid>
                <Grid container spacing={3} justify='space-evenly' >
                <Grid item container direction="column" alignItems='center' xs={6} sm={3} className={classes.roundedImage}>
                <ReactRoundedImage
                                    image={Wallet}
                                    imageWidth='100'
                                    imageHeight='100'
                                    //roundedColor={theme.palette.primary.main}
                                    //hoverColor={theme.palette.secondary.main}
                                    roundedSize={2}
                                    hoverColor="#DD1144"
                />
                <Typography>Wallet History</Typography>
                </Grid>
                <Grid item container direction="column" alignItems='center' xs={6} sm={3} className={classes.roundedImage}>
                <ReactRoundedImage
                                    image={Order}
                                    imageWidth='100'
                                    imageHeight='100'
                                    roundedCol='grey'
                                    //roundedColor={theme.palette.primary.main}
                                    //hoverColor={theme.palette.secondary.main}
                                    roundedSize={2}
                                    hoverColor="#DD1144"
                />
                <Typography>Your Orders</Typography>
                </Grid>
                <Grid item container direction="column" alignItems='center' xs={6} sm={3} className={classes.roundedImage}>
                <ReactRoundedImage
                                    image={Review}
                                    imageWidth='100'
                                    imageHeight='100'
                                    //roundedColor={theme.palette.primary.main}
                                    //hoverColor={theme.palette.secondary.main}
                                    roundedSize={2}
                                    hoverColor="#DD1144"
                />
                <Typography>Reviews</Typography>
                </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
    </Container>
  );
}
