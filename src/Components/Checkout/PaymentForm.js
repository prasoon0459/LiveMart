import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Radio } from "@material-ui/core";
import theme from "../../theme";
import { AccountBalanceWallet } from "@material-ui/icons";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  walletContainer: {
    padding: theme.spacing(1, 1, 1),
    margin: theme.spacing(2, 0, 0),
  },
  walletIcon: {
    height: "50px",
    width: "50px",
    margin: theme.spacing(0, 2, 0),
  },
  walletHeadingText: {
    fontSize: 18,
    fontWeight: 600,
  },
  paymentOptionName: {
    margin: theme.spacing(0, 1, 0),
  },
});

export default function PaymentForm() {
  const classes = useStyles();
  const [wallet, setWallet] = React.useState(false);
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [balance, setBalance] = React.useState(0);

  const handlePaymentOptionChange = (event) => {
    setWallet(!wallet);
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
        const result = response.data[0].wallet;
        setBalance(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    try {
      getUserWallet();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <React.Fragment>
      {console.log(balance)}
      <Typography variant="h6" gutterBottom>
        Select Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container className={classes.walletContainer}>
            <Radio
              id="wallet"
              checked={wallet}
              onClick={handlePaymentOptionChange}
            />
            <label for="wallet">
              <Grid container direction="row" alignItems="center">
                <Grid item>
                  <AccountBalanceWallet
                    className={classes.walletIcon}
                  ></AccountBalanceWallet>
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Typography
                      align="left"
                      className={classes.walletHeadingText}
                      variant="subtitle1"
                    >
                      LiveMART Wallet
                    </Typography>
                    <Typography align="left" variant="body1">
                      Balance : $ {balance}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </label>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
