import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import theme from '../../theme'

const useStyles = makeStyles({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    padding: theme.spacing(4, 4, 4),
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
})

const ChangePwd = () => {

  const classes = useStyles();

  const handlechangePassword = () => {

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
            </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password"
            label="New Password"
            type="password"
            id="new_password"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
            id="password"
            InputLabelProps={{
              className: classes.floatingLabelFocusStyle,
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handlechangePassword}
            className={classes.submit}
          >
            Change Password
              </Button>
        </form>
      </div>
    </Container>
  )

}

export default ChangePwd;