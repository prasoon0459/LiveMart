import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Radio, } from '@material-ui/core';
import theme from '../../theme';
import { AccountBalanceWallet } from '@material-ui/icons';


const useStyles = makeStyles({
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint
  },
  walletContainer: {
    padding: theme.spacing(1, 1, 1),
    margin: theme.spacing(2, 0, 0)
  },
  walletIcon: {
    height: '50px',
    width: '50px',
    margin: theme.spacing(0, 2, 0)
  },
  walletHeadingText: {
    fontSize: 18,
    fontWeight: 600
  },
  paymentOptionName: {
    margin: theme.spacing(0, 1, 0)
  },
})

export default function PaymentForm() {

  const classes = useStyles()
  const [wallet, setWallet] = React.useState(false)

  const handlePaymentOptionChange = (event) => {
    setWallet(!wallet)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container className={classes.walletContainer}>
            <Radio id='wallet' checked={wallet} onClick={handlePaymentOptionChange} />
            <label for='wallet'>
              <Grid container direction='row' alignItems='center'>
                <Grid item><AccountBalanceWallet className={classes.walletIcon}></AccountBalanceWallet></Grid>
                <Grid item>
                  <Grid container direction='column'>
                    <Typography align='left' className={classes.walletHeadingText} variant='subtitle1'>LiveMART Wallet</Typography>
                    <Typography align='left' variant='body1'>Balance : $ 390</Typography>
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

