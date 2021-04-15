import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Order from '../../img/order.jfif';
import Review from '../../img/review.jfif';
import Wallet from '../../img/wallet.jfif';
import Coin from '../../img/coins.jfif';
import ReactRoundedImage from 'react-rounded-image'
import Info from './info';


const useStyles = makeStyles((theme) => ({
  roots :{
      margin:`calc(1em + ${theme.spacing(1)}px)`,
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
}));

export default function Profile() {
  const classes = useStyles();
  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.roots}>
        <Grid container spacing={2}>
        <Info />
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
