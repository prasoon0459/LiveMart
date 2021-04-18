import React from "react";
import {
  CardActionArea,
  makeStyles,
  Container,
  Typography,
  Grid,
  CssBaseline
} from "@material-ui/core";
import Order from "../../img/order.jfif";
import Review from "../../img/review.jfif";
import Wallet from "../../img/wallet.jfif";
import Coin from "../../img/coins.jpg";
import ReactRoundedImage from "react-rounded-image";
import Info from "./info";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../serverURL";
import UseWindowDimensions from '../../utils/UseWindowDimensions';

const useStyles = makeStyles((theme) => ({
  roots: {
    margin: `calc(1em + ${theme.spacing(1)}px)`,
  },
  divider: {
    margin: theme.spacing(1, 0, 2)
  },
  text: {
    padding: theme.spacing(3, 3, 3),
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
  walletBalance: {
    fontWeight: 500
  },
  cardContainer: {
    padding: theme.spacing(2, 2, 2)
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const mobile=UseWindowDimensions().mobile
  const history= useHistory()
  const [wallet, setWallet]=React.useState(300);
  
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  const setDetails = (result) => {
    console.log(result[0]);
    // setName(result[0].name);
     console.log(result);
    setWallet(result[0].wallet);
  }

  const getUserWallet = () => {
    var config = {
        method: 'get',
        url: serverUrl+'/account/users/',
        headers: { 
          'Authorization': "JWT " + token
        }
      };

      axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        const result = response.data.filter((val) => username===val.username);
        setDetails(result);
      })
      .catch(function (error) {
        console.log(error);
      });          
  }

  React.useEffect(() => {
      try {
          getUserWallet();
      } catch (error) {
          console.log(error);
      }
    }, [])

  const handleReviewsClicked = () => {
    history.push('/reviews')
  }
  const handleOrdersClicked = () => {
    history.push('/orders')
  }
  const handleWalletHistoryClicked = () => {
    history.push('/wallet')
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.roots}>
        <Grid container direction='row' alignItems='flex-start' spacing={2} className={classes.root}>
          <Info token={props.token} />
          <Grid item xs={12} md={8}>
            <Grid
              item
              container
              className={classes.text}
              xs={12}
            >
              <Typography className={classes.walletBalance} component="h1" variant="h4">
                Wallet Balance: ${wallet}
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
