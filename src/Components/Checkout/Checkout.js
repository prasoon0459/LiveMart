/* eslint-disable */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PaymentForm from "./PaymentForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import Review from "./Review";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import Imgix from "react-imgix";
import check from "../../img/check.gif";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { minMaxLength } from "../Auth/validation";
import axios from "axios";
import serverUrl from "../../serverURL";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },

  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  shipmentToHeading: {
    fontWeight: 600,
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
  title: {
    margin: theme.spacing(0, 0, 2),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  label: {
    color: theme.palette.text.disabled,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },
  date: {
    margin: theme.spacing(2, 0, 2),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = [
  "Delivery Option",
  "Shipping address / Pickup Details",
  "Payment details",
  "Review your order",
];

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const shopSet = new Set();
  const products = props.location.cartItems;
  const [shopNames, setShopNames] = React.useState([]);
  const [shops, setShops] = React.useState([]);
  const [order_id, setOrderId] = React.useState("Getting your orderId");
  const [pickUpDates, setPickupDates] = React.useState([]);
  const [pickUpDatesReq, setPickupDatesReq] = React.useState([]);
  const user_type = localStorage.getItem("usertype");
  const [address, setAddress] = React.useState({
    firstName: null,
    lastName: null,
    addressLine1: null,
    addressLine2: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    phone: null,
  });
  const [error, setError] = React.useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });
  console.log(props.location.cartItems);

  const handleShopNames = (props) => {
    setShopNames(props);
  };

  const handlePickups = () => {
    products.map((product) => {
      shopSet.add(product.item.shopName);
    });
    setShops(Array.from(shopSet));
    // for (var i =0;i<arr.length;i++) {
    //   const shopName = arr[i].name;
    //   const item_num = (products.filter()).length
    // }
  };

  const [orders, setOrders] = React.useState([
    {
      id: "93GD73BDB82H",
      seller_name: "M/s Agarwal General Store",
      seller_address:
        "Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India",
      items: [
        { name: "Lifeboy Soap", variant: "100gm", quantity: 6, price: 9.99 },
        {
          name: "Kurkure Masala Munch",
          variant: "200gm",
          quantity: 4,
          price: 3.45,
        },
        {
          name: "Dettol Hand Sanitizer",
          quantity: 2,
          variant: "50ml",
          price: 6.51,
        },
      ],
      total_price: 342.64,
      mode: "online",
      customer_name: "Prasoon Baghel",
      customer_mobile: "9133260431",
      delivery_address:
        "D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India",
      order_date: "18th March 2021",
      expected_delivery: "23rd March 2021",
      status: 2,
    },
    {
      id: "93GD73BDB82H",
      seller_name: "M/s Agarwal General Store",
      seller_address:
        "Shop no 12, Anand Plaza, Kalindipuram, Lucknow, UP 226029, India",
      items: [
        { name: "Lifeboy Soap", variant: "100gm", quantity: 6, price: 9.99 },
        {
          name: "Dettol Hand Sanitizer",
          quantity: 2,
          variant: "50ml",
          price: 6.51,
        },
      ],
      total_price: 342.64,
      mode: "online",
      customer_name: "Prasoon Baghel",
      customer_mobile: "9133260431",
      delivery_address:
        "D1103 Daljit Vihar, AWHO Vrindawan Awas Yojna Sector 6A, Telibagh, Lucknow, UP - 226029 India",
      order_date: "18th March 2021",
      expected_delivery: "23rd March 2021",
      status: 2,
    },
  ]);

  const [option, setOption] = React.useState(0);
  const [mode, setMode] = React.useState("");
  const [wallet, setWallet] = React.useState(false);
  const [walletBalance, setWalletBalance] = React.useState(0);

  const handleOptionChanged = (event) => {
    setOption(event.target.value);
    for (var i = 0; i < orders.length; i++) {
      if (option === "0") setMode("Online");
      else setMode("Offline");
    }
  };

  const handleAddressChange = (event) => {
    const id = event.target.id;
    const new_address = address;
    new_address[id] = event.target.value;
    if (id === "firstName") setError({ ...error, firstName: "" });
    else if (id === "lastName") setError({ ...error, lastName: "" });
    else if (id === "addressLine1") setError({ ...error, addressLine1: "" });
    else if (id === "state") setError({ ...error, state: "" });
    else if (id === "zip") setError({ ...error, zip: "" });
    else if (id === "city") setError({ ...error, city: "" });
    else if (id === "country") setError({ ...error, country: "" });
    else if (id === "phone") setError({ ...error, phone: "" });
    setAddress(new_address);
    console.log(id);
    console.log(address);
  };

  // const handlePickupDateChange = (index, event) => {
  //   var newOrders = orders;
  //   console.log(index + " " + event);
  //   newOrders[index].expected_delivery = event.target.value;
  //   console.log(newOrders[index].expected_delivery);
  //   setOrders(newOrders);
  // };
  const handleLastNameError = () => {
    if (minMaxLength(address["lastName"], 3)) {
      setError({ ...error, lastName: "Must be greater than 3 character" });
    }
  };
  const handleFirstNameError = () => {
    if (minMaxLength(address["firstName"], 3)) {
      setError({ ...error, firstName: "Must be greater than 3 character" });
    }
  };
  const handleCityError = () => {
    if (minMaxLength(address["city"], 1)) {
      setError({ ...error, city: "Must be greater than 1 character" });
    }
  };
  const handleStateError = () => {
    if (minMaxLength(address["state"], 1)) {
      setError({ ...error, state: "Must be greater than 1 character" });
    }
  };
  const handleZipError = () => {
    let reg = new RegExp(/^\d*$/).test(address["zip"]);
    if (address["zip"].length !== 6)
      setError({ ...error, zip: "Must be 6 digit" });
    else if (!reg) setError({ ...error, zip: "Only number permitted" });
  };
  const handlePhoneError = () => {
    let reg = new RegExp(/^\d*$/).test(address["phone"]);
    if (address["phone"].length !== 10)
      setError({ ...error, phone: "Must be 10 digit" });
    else if (!reg) setError({ ...error, phone: "Only number permitted" });
  };
  const handleCountryError = () => {
    if (minMaxLength(address["country"], 1)) {
      setError({ ...error, country: "Must be greater than 1 character" });
    }
  };
  const handleAddressError = () => {
    if (minMaxLength(address["addressLine1"], 3)) {
      setError({ ...error, addressLine1: "Must be greater than 3 character" });
    }
  };
  const handleWallet = (balance) => {
    setWallet(true);
    setWalletBalance(balance);
  };

  const getAddressStep = () => {
    return (
      <React.Fragment>
        {console.log(error)}
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
              onBlur={handleFirstNameError}
              error={error["firstName"] !== ""}
              helperText={error["firstName"]}
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
              onBlur={handleLastNameError}
              error={error["lastName"] !== ""}
              helperText={error["lastName"]}
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
              onBlur={handleAddressError}
              error={error["addressLine1"] !== ""}
              helperText={error["addressLine1"]}
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
              id="phone"
              name="phone"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              label="Phone No"
              fullWidth
              value={address.phone}
              onChange={handleAddressChange}
              onBlur={handlePhoneError}
              error={error["phone"] !== ""}
              helperText={error["phone"]}
              autoComplete="phone-no"
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
              onBlur={handleCityError}
              error={error["city"] !== ""}
              helperText={error["city"]}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              autoComplete="shipping address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="state"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              onBlur={handleStateError}
              error={error["state"] !== ""}
              helperText={error["state"]}
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
              onBlur={handleZipError}
              error={error["zip"] !== ""}
              helperText={error["zip"]}
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
              onBlur={handleCountryError}
              error={error["country"] !== ""}
              helperText={error["country"]}
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
  };

  const getPickupDetailsStep = () => {
    const handleExpectedPickUpDate = (index, e, len) => {
      var new_arr = pickUpDates;
      var new_arr2 = pickUpDatesReq;
      if (new_arr.length < len) {
        new_arr = [...new_arr, e];
        new_arr2 = [...new_arr2, e.toLocaleDateString()];
      } else {
        new_arr[index] = e;
        new_arr[index] = e.toLocaleDateString();
      }
      setPickupDates(new_arr);
      setPickupDatesReq(new_arr2);
      console.log(new_arr2);
    };
    return (
      <React.Fragment>
        {console.log(pickUpDates)}
        {shops.map((shopName, index) => {
          const item_num = products.filter(
            (product) => product.item.shopName === shopName
          ).length;

          return (
            <Grid container direction="column" alignItems="flex-start">
              <Typography align="left" className={classes.shipmentToHeading}>
                Pickup of {item_num} item(s) from:
              </Typography>
              <Typography align="left">{shopName}</Typography>
              <form className={classes.container} noValidate>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="pickup-date"
                    label="Expected Pickup Date"
                    format="dd/MM/yyyy"
                    value={pickUpDates[index]}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                    }}
                    onChange={(e) =>
                      handleExpectedPickUpDate(index, e, shops.length)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </form>
            </Grid>
          );
        })}
      </React.Fragment>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            {console.log(error)}
            <Typography variant="h6" gutterBottom>
              Delivery Option
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="option"
                name="option"
                value={option}
                onChange={handleOptionChanged}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Delivery to Home"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Store Pickup"
                />
              </RadioGroup>
            </FormControl>
          </React.Fragment>
        );
      case 1:
        return option === "0" ? getAddressStep() : getPickupDetailsStep();
      case 2:
        return <PaymentForm handleWallet={handleWallet} />;
      case 3:
        return (
          <Review
            cartItems={props.location.cartItems}
            delMode={mode}
            delAddress={address}
            totalPrice={props.location.totalPrice}
            handleShopNames={handleShopNames}
            pickUpDates={pickUpDates}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const placeOrderRequest = () => {
    var data = JSON.stringify({});
    if (mode === "Online") {
      const final_address =
        address["addressLine1"].toString() +
        ", " +
        (address["addressLine2"] !== null
          ? address["addressLine2"].toString() + ", "
          : "") +
        address["city"].toString() +
        ", " +
        address["state"].toString() +
        ", " +
        address["country"].toString();
      data = JSON.stringify({
        username: username,
        deliveryAddress: final_address,
        shops: shopNames,
        name:
          address["firstName"].toString() +
          " " +
          address["lastName"].toString(),
        phno: address["phone"],
        mode: mode,
      });
    } else {
      data = JSON.stringify({
        username: username,
        shops: shopNames,
        delDate: pickUpDatesReq,
        mode: mode,
      });
    }
    var config = {};
    if (user_type === "1") {
      config = {
        method: "post",
        url: serverUrl + "/create_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    } else {
      config = {
        method: "post",
        url: serverUrl + "/create_retail_transaction/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOrderId(response.data.order_num);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleNext = () => {
    if (option === "0") {
      setMode("Online");
    } else {
      setMode("Offline");
      handlePickups();
    }
    if (activeStep < 2) setWallet(false);
    // console.log(activeStep);
    console.log(steps.length);
    if (activeStep === steps.length - 1) {
      placeOrderRequest();
    }
    setActiveStep(activeStep + 1);
  };
  const validationCond = () => {
    if (
      error["firstName"] !== "" ||
      error["lastName"] !== "" ||
      error["addressLine1"] !== "" ||
      error["city"] !== "" ||
      error["state"] !== "" ||
      error["zip"] !== "" ||
      error["country"] !== "" ||
      error["phone"] !== "" ||
      mode === ""
      // address["firstName"] === null ||
      // address["lastName"] === null ||
      // address["addressLine1"] === null ||
      // address["city"] === null ||
      // address["state"] === null ||
      // address["zip"] === null ||
      // address["country"] === null
    )
      return true;
    else if (
      (address["firstName"] === null ||
        address["lastName"] === null ||
        address["addressLine1"] === null ||
        address["city"] === null ||
        address["state"] === null ||
        address["zip"] === null ||
        address["country"] === null ||
        address["phone"] === null) &&
      activeStep === 1 &&
      mode === "Online"
    )
      return true;
    else if (activeStep === 2 && wallet === false) return true;
    else return false;
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
                <StepLabel classes={{ label: classes.label }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {order_id === "Getting your orderId" ? (
                  <CircularProgress />
                ) : (
                  <Imgix
                    src={check}
                    width="100"
                    height="100"
                    imgixParams={{
                      fit: "fit",
                      fm: "gif",
                    }}
                  ></Imgix>
                )}
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  Order No#: {order_id}
                </Typography>
                <Typography variant="subtitle1">
                  We have emailed your order confirmation, and will send you an
                  update when your order has shipped.
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
                    disabled={validationCond()}
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
export default withRouter(Checkout);
