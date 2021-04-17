import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Grid, TextField } from "@material-ui/core";
import Imgix from "react-imgix";
import check from '../../img/check.gif'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint
  },
  title: {
    margin: theme.spacing(0, 0, 2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop:theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [address, setAddress] = React.useState({
      firstName:null,
      lastName:null,
      addressLine1:null,
      addressLine2:null,
      city:null,
      state:null,
      zip:null,
      country:null
  });

  const handleAddressChange = (event)=>{
      const id=event.target.id
      const new_address=address
      new_address[id]=event.target.value
      setAddress(new_address)
  }


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  onChange={handleAddressChange}
                  fullWidth
                  value={address.firstName}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  onChange={handleAddressChange}
                  fullWidth
                  value={address.lastName}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="addressLine1"
                  name="addressLine1"
                  label="Address line 1"
                  onChange={handleAddressChange}
                  fullWidth
                  value={address.addressLine1}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  autoComplete="shipping address-line1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addressLine2"
                  name="addressLine2"
                  label="Address line 2"
                  onChange={handleAddressChange}
                  fullWidth
                  value={address.addressLine2}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  autoComplete="shipping address-line2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  value={address.city}
                  onChange={handleAddressChange}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  autoComplete="shipping address-level2"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  label="State/Province/Region"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  label="Zip / Postal code"
                  fullWidth
                  value={address.zip}
                  onChange={handleAddressChange}
                  autoComplete="shipping postal-code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  value={address.country}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  onChange={handleAddressChange}
                  fullWidth
                  autoComplete="shipping country"
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review address={address}/>;
      default:
        throw new Error("Unknown step");
    }
  };

  const handleNext = () => {
    console.log(address)
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper elevation={3} className={classes.paper}>
          <Typography
            className={classes.title}
            component="h1"
            variant="h4"
            align="center"
          >
            Checkout
          </Typography>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            className={classes.stepper}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                  <Imgix
                    src={check}
                    width='100'
                    height='100'
                    imgixParams={{
                        fit: "fit",
                        fm: "gif",
                    }}
                >
                </Imgix>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
