import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MenuItem } from "@material-ui/core";
import serverUrl from "../../serverURL";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { minMaxLength, validEmail, passwordStrength } from "./validation";

var FormData = require("form-data");

const roles = [
  {
    value: "customer",
    label: "Customer",
  },
  {
    value: "retailer",
    label: "Retailer",
  },
  {
    value: "wholesaler",
    label: "Wholesaler",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  copyright: {
    marginBottom: theme.spacing(8),
  },
  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [role, setRole] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({
    name: "",
    mob: "",
    userName: "",
    mail: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const history = useHistory();

  const payload = {
    username: username,
    user_type: role,
    name: name,
    mail: mail,
    phno: phone,
    wallet: 0,
    address: address,
  };

  const handleSubmit = () => {
    JSON.stringify(payload);
    var data = new FormData();
    data.append("username", username);
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setRole(index);
    };
    data.append("password", password);
    data.append("password2", password2);
    var config = {
      method: "post",
      url: serverUrl + "/account/register/",
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var config2 = {
          method: "post",
          url: serverUrl + "/account/users/",
          headers: {
            Authorization: `JWT ${response.data.token}`,
            "Content-Type": "application/json",
          },
          data: payload,
        };
        axios(config2)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            history.push("/login");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleName = (e) => {
    setName(e.target.value);
    setError({ ...error, name: "" });
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setError({ ...error, userName: "" });
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setError({ ...error, address: "" });
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
    setError({ ...error, mail: "" });
  };
  const handleMobNo = (e) => {
    setPhone(e.target.value);
    setError({ ...error, mob: "" });
  };
  const handlePass = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: "" });
  };
  const handleConfirmPass = (e) => {
    setPassword2(e.target.value);
    setError({ ...error, confirmPassword: "" });
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setRole(index);
  };
  const handleUserNameError = () => {
    if (minMaxLength(username, 3)) {
      setError({ ...error, userName: "Must be greater than 3 character" });
    }
  };
  const handleMobError = () => {
    console.log(phone.length);
    let reg = new RegExp(/^\d*$/).test(phone);
    if (phone.length !== 10) setError({ ...error, mob: "Must be 10 digit" });
    else if (!reg) setError({ ...error, mob: "Only number permitted" });
  };
  const handleAddressError = () => {
    if (minMaxLength(address, 3)) {
      setError({ ...error, address: "Must be greater than 3 character" });
    }
  };
  const handleNameError = () => {
    if (minMaxLength(name, 3)) {
      setError({ ...error, name: "Must be greater than 3 character" });
    }
  };
  const handleEmailError = () => {
    if (!mail || validEmail(mail)) {
      setError({ ...error, mail: "Please provide a valid email" });
    }
  };
  const handlePasswordError = () => {
    if (minMaxLength(password, 6))
      setError({ ...error, password: "Must be greater than 6 character" });
    else if (passwordStrength(password))
      setError({
        ...error,
        password:
          "Password is not strong enough. Include an upper case letter, a number or a special character to make it strong",
      });
    if (password2 !== "") {
      validateConfirmPassword(password, password2);
    }
  };
  const handleConfirmPasswordError = () => {
    validateConfirmPassword(password, password2);
  };
  function validateConfirmPassword(password, confirmpassword) {
    if (password !== confirmpassword) {
      setError({
        ...error,
        confirmPassword: " Password is not matching",
      });
      return false;
    } else if (error["password"] !== "") {
      setError({
        ...error,
        confirmPassword: error["password"],
      });
      return false;
    } else
      setError({
        ...error,
        confirmPassword: "",
      });
  }
  return (
    <Container component="main" maxWidth="xs">
      {/* {console.log(typeof error)} */}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                onBlur={handleNameError}
                error={error["name"] !== ""}
                helperText={error["name"]}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="userName"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="Username"
                onBlur={handleUserNameError}
                error={error["userName"] !== ""}
                helperText={error["userName"]}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleUsername}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="role"
                select
                fullWidth
                label="Role"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                variant="outlined"
              >
                {roles.map((option, index) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={handleEmailError}
                error={error["mail"] !== ""}
                helperText={error["mail"]}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleEmail}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobile"
                label="Mobile Number"
                name="mobile"
                onBlur={handleMobError}
                error={error["mob"] !== ""}
                helperText={error["mob"]}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleMobNo}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                onBlur={handleAddressError}
                error={error["address"] !== ""}
                helperText={error["address"]}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleAddress}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onBlur={handlePasswordError}
                error={error["password"] !== ""}
                helperText={error["password"]}
                label="Password"
                type="password"
                id="password"
                onChange={handlePass}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onBlur={handleConfirmPasswordError}
                error={error["confirmPassword"] !== ""}
                helperText={error["confirmPassword"]}
                type="password"
                id="confirmpassword"
                onChange={handleConfirmPass}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={
              error["userName"] !== "" ||
              error["name"] !== "" ||
              error["mail"] !== "" ||
              error["password"] !== "" ||
              error["confirmPassword"] !== "" ||
              error["mob"] !== "" ||
              error["address"] !== ""
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
