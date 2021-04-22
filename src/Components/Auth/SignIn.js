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
import axios from "axios";
import { useHistory } from "react-router-dom";
import serverUrl from "../../serverURL";
import { validEmail } from "./validation";

var FormData = require("form-data");

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  infoContainer: {
    margin: theme.spacing(0, 1, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  const [pwdVerified, setPwdVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [recOtp, setRecOtp] = useState(0);
  const [error, setError] = useState({
    mail: "",
    password: "",
  });
  const [otpStatus, setOtpStatus] = useState(false);

  const handleSendOTP = () => {
    var data = new FormData();
    data.append("email", email);
    var config = {
      method: "post",
      url: serverUrl + "/otp/",
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setRecOtp(response.data.otp);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOtpStatus(true);
  };

  const history = useHistory();

  const handleSignIn = () => {
    if (otp === recOtp) {
      setOtpVerified(true);
      var data2 = new FormData();
      data2.append("email", email);
      data2.append("password", password);
      // console.log(data2);
      var config2 = {
        method: "post",
        url: serverUrl + "/account/login/",
        data: data2,
      };

      axios(config2)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          // setToken(response.data.token);
          props.handleToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user);
          localStorage.setItem("usertype", response.data.user_type);
          history.push("/");
        })
        .catch(function (error) {
          console.log(error);
          setPwdVerified(true);
        });
    } else {
      setOtpVerified(false);
    }
  };

  const handleOtp = (e) => {
    setOtp(parseInt(e.target.value));
  };
  const handleMail = (e) => {
    setEmail(e.target.value);
    setError({ ...error, mail: "" });
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError({ ...error, password: "" });
  };
  const handleEmailError = () => {
    if (!email || validEmail(email)) {
      setError({ ...error, mail: "Please provide a valid email" });
    }
  };
  // const handlePasswordError = () => {
  //   console.log('asdsad');
  // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            disabled={otpStatus}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={handleMail}
            onBlur={handleEmailError}
            error={error["mail"] !== ""}
            helperText={error["mail"]}
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            autoComplete="email"
            autoFocus
          />
          <Button
            fullWidth
            disabled={otpStatus || error["mail"] !== ""}
            variant="contained"
            color="primary"
            onClick={handleSendOTP}
            className={classes.submit}
          >
            Send OTP
          </Button>
          <Grid container className={classes.infoContainer}>
            <Typography variant="body2" color="secondary">
              * An OTP will be sent to your Email.
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs>
              <Link href="/forgot_pwd" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {otpStatus ? (
            <Grid container>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="OTP"
                label="OTP"
                type="password"
                id="OTP"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handleOtp}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                onChange={handlePassword}
              />
              {pwdVerified ? (
                <Typography align="center" color="secondary">
                  Password Incorrect
                </Typography>
              ) : null}
              {!otpVerified ? (
                <Typography align="center" color="secondary">
                  OTP Incorrect
                </Typography>
              ) : null}
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Grid>
          ) : (
            <div />
          )}
        </form>
      </div>
    </Container>
  );
}
