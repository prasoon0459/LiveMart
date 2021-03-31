import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import { Hidden } from "@material-ui/core";

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

export default function SignIn() {
  const classes = useStyles();

  const [pwdVerified, setPwdVerified] = useState(false);

  const handleSendOTP = () => {
    setPwdVerified(true);
  };

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
            disabled={pwdVerified}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            disabled={pwdVerified}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <Button
            fullWidth
            disabled={pwdVerified}
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

          {pwdVerified ? (
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
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
