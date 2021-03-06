/* eslint-disable */

import React from "react";
import {
  CardActionArea,
  makeStyles,
  Container,
  Typography,
  Grid,
  CssBaseline,
  Fab,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  DialogActions,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Order from "../../img/order.jfif";
import Review from "../../img/review.jfif";
import Coin from "../../img/coins.jpg";
import ReactRoundedImage from "react-rounded-image";
import Info from "./info";
import { useHistory } from "react-router-dom";
import axios from "axios";
import serverUrl from "../../serverURL";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Imgix from "react-imgix";
import check from "../../img/check.gif";

const useStyles = makeStyles((theme) => ({
  roots: {
    margin: `calc(1em + ${theme.spacing(1)}px)`,
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  divider: {
    margin: theme.spacing(1, 0, 2),
  },
  text: {
    padding: theme.spacing(3, 3, 3),
    margin: theme.spacing(0, 0, 3),
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
    fontWeight: 500,
  },
  cardContainer: {
    padding: theme.spacing(2, 2, 2),
  },
  editIcon: {
    marginRight: theme.spacing(1),
  },
  add: {
    textAlign: "center",
  },
  btnAdd: {
    margin: theme.spacing(1, 0, 0),
  },
  hintText: {
    flexGrow: 1,
    width: "100%",
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const history = useHistory();
  const [wallet, setWallet] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [userDetails, setUserDetails] = React.useState({});

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const setDetails = (result) => {
    console.log(result);
    // setName(result[0].name);
    setUserDetails(result);
    setWallet(result.wallet);
  };
  const handleClickFab = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
  };
  const handleAddClose = () => {
    setAdd(false);
  };
  const handleFinal = () => {
    handleAddWallet();
    setOpen(false);
    setAdd(true);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    console.log(e.target.value);
  };

  const getUserWallet = () => {
    var config = {
      method: "get",
      url: serverUrl + "/account/users/?u=" + username,
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const result = response.data[0];
        setDetails(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    try {
      getUserWallet();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleReviewsClicked = () => {
    history.push("/reviews");
  };
  const handleOrdersClicked = () => {
    history.push("/orders");
  };
  const handleWalletHistoryClicked = () => {
    history.push("/wallet");
  };

  const handleAddWallet = () => {
    var data = userDetails;
    data.wallet += parseInt(amount);
    setWallet(wallet + parseInt(amount));
    data = JSON.stringify(data);
    console.log(data);
    var config = {
      method: "put",
      url: userDetails.url,
      headers: {
        Authorization: "JWT " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.roots}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          spacing={2}
          className={classes.root}
        >
          <Info token={props.token} />
          <Grid item xs={12} md={8}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={classes.text}
              xs={12}
            >
              <Grid item xs={12}>
                <Typography
                  className={classes.walletBalance}
                  component="h1"
                  variant="h4"
                >
                  Wallet Balance: ???
                  {wallet === "" ? <CircularProgress /> : wallet}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Fab
                  variant="extended"
                  size="small"
                  className={classes.fab}
                  onClick={handleClickFab}
                  color="primary"
                  aria-label="edit"
                >
                  <MonetizationOnIcon className={classes.editIcon} />
                  Add Money
                </Fab>
                <Dialog
                  open={open}
                  scroll="paper"
                  onClose={handleDialogClose}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">
                    <Grid item container justify="center">
                      Add Money
                    </Grid>
                  </DialogTitle>
                  <DialogContent dividers classes={classes.add}>
                    Please enter a amount
                    <TextField
                      autoFocus
                      margin="normal"
                      id="input-amount"
                      label="Amount"
                      fullWidth
                      onChange={handleAmount}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                      }}
                    />
                    <Grid container direction="column" alignItems="center">
                      <Grid item className={classes.hintText}>
                        <Typography
                          color="secondary"
                          variant="caption"
                          align="left"
                        >
                          *The amount will be added to your LiveMart Wallet
                        </Typography>
                      </Grid>
                      <Button
                        align="center"
                        color="primary"
                        className={classes.btnAdd}
                        variant="contained"
                        onClick={handleFinal}
                      >
                        Add Money
                      </Button>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={add}
                  scroll="paper"
                  onClose={handleAddClose}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogContent>
                    <Grid container direction="column" alignItems="center">
                      <Imgix
                        src={check}
                        width="100"
                        height="100"
                        align="center"
                        imgixParams={{
                          fit: "fit",
                          fm: "gif",
                        }}
                      ></Imgix>
                      <Typography variant="subtitle1">
                        The amount is succesfully added to your LiveMart Wallet
                      </Typography>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleAddClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
            <Grid container spacing={3} justify="space-evenly">
              {/* <Grid
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
              </Grid> */}
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
                  <Grid
                    container
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
                  <Grid
                    container
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
