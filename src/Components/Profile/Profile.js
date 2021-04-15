import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Order from "../../img/order.jfif";
import Review from "../../img/review.jfif";
import Wallet from "../../img/wallet.jfif";
import Coin from "../../img/coins.jpg";
import ReactRoundedImage from "react-rounded-image";
import Info from "./info";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import { CardActionArea, Divider, Link } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  roots: {
    margin: `calc(1em + ${theme.spacing(1)}px)`,
  },
  divider:{
    margin:theme.spacing(1,0,2)
  },
  text: {
    padding: theme.spacing(3,3,3),
    margin: theme.spacing(0, 0, 3,),
    backgroundImage: `url(${Coin})`,
    height: "20vh",
    // [theme.breakpoints.down("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   height:"auto"
    // },
  },
  roundedImage: {
    margin: theme.spacing(2),
  },
  walletBalance:{
    fontWeight: 500
  },
  cardContainer:{
    padding:theme.spacing(2,2,2)
  }
}));

export default function Profile() {
  const classes = useStyles();
  const mobile=UseWindowDimensions().mobile
  const history= useHistory()

  const handleReviewsClicked =()=>{

  }
  const handleOrdersClicked =()=>{
    history.push('/orders')
  }
  const handleWalletHistoryClicked =()=>{
    
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.roots}>
      <Grid container direction='row' alignItems='flex-start' spacing={2} className={classes.root}>
          <Info />
          <Grid item xs={12} md={8}>
            <Grid
              item
              container
              className={classes.text}
              xs={12}
            >
              <Typography className={classes.walletBalance} component="h1" variant="h4">
                Wallet Balance: $10
              </Typography>
            </Grid>
            <Grid container spacing={3} justify="space-evenly">
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={3}
                className={classes.roundedImage}
              >
                <CardActionArea onClick={handleWalletHistoryClicked}>
                  <Grid container 
                    className={classes.cardContainer}
                    direction="column"
                    alignItems="center"
                  >
                  <ReactRoundedImage
                  image={Wallet}
                  imageWidth="100"
                  imageHeight="100"
                  //roundedColor={theme.palette.primary.main}
                  //hoverColor={theme.palette.secondary.main}
                  roundedSize={2}
                  hoverColor="#DD1144"
                />
                <Typography>Wallet History</Typography>
                  </Grid>
                </CardActionArea>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={3}
                className={classes.roundedImage}
              >
                <CardActionArea onClick={handleOrdersClicked}>
                  <Grid container 
                    className={classes.cardContainer}
                    direction="column"
                    alignItems="center"
                  >
                  <ReactRoundedImage
                  image={Order}
                  imageWidth="100"
                  imageHeight="100"
                  //roundedColor={theme.palette.primary.main}
                  //hoverColor={theme.palette.secondary.main}
                  roundedSize={2}
                  hoverColor="#DD1144"
                />
                <Typography>Your Orders</Typography>
                  </Grid>
                </CardActionArea>
              </Grid>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={6}
                sm={3}
                className={classes.roundedImage}
              >
                <CardActionArea onClick={handleReviewsClicked}>
                  <Grid container 
                    className={classes.cardContainer}
                    direction="column"
                    alignItems="center"
                  >
                  <ReactRoundedImage
                  image={Review}
                  imageWidth="100"
                  imageHeight="100"
                  //roundedColor={theme.palette.primary.main}
                  //hoverColor={theme.palette.secondary.main}
                  roundedSize={2}
                  hoverColor="#DD1144"
                />
                <Typography>Your Reviews</Typography>
                  </Grid>
                </CardActionArea>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
      </div>
    </Container>
  );
}
