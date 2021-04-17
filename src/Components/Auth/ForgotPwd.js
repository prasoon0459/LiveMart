import { Box, Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import Imgix from 'react-imgix';
import forgotpwd from '../../img/forgot_pwd.svg'
import Grid from "@material-ui/core/Grid";
import theme from '../../theme';
import React from "react";
import axios from "axios";
import serverUrl from "../../serverURL";

var FormData = require('form-data');

const useStyles=makeStyles({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    floatingLabelFocusStyle: {
        color: theme.palette.text.hint
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        marginTop: '20px',
        height: '70vh'
    },
    image: {
        width: '100vw',
        height: '60vh',
    }
})

const ForgotPassword = () => {
    const classes= useStyles();
    const [pwdVerified, setPwdVerified] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [otp, setOtp] = React.useState(0);
    const [recOtp, setRecOtp] = React.useState(0);
    const [formErrors, setFormErrors] = React.useState({});
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const handleOtp = (e) => {
        setOtp(parseInt(e.target.value));
    }

    const handleSendOTP = () => {
        var data = new FormData();
        data.append('email', email);
        var config = {
          method: 'post',
          url: serverUrl+'/otp/',
          data : data
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setRecOtp(response.data.otp);
        })
        .catch(function (error) {
          console.log(error);
        });
        setPwdVerified(true);
    };


    const handleToken = (e) => {
        setToken(e.target.value);
    };
    
    const handleReset = () => {
        
    };
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Imgix
                        src={forgotpwd}
                        width='250px'
                        height='250px'
                        imgixParams={{
                            fit: "fit",
                            fm: "svg"
                        }}
                    >
                    </Imgix>
                    <Box display='flex' flexDirection='row' alignItems='flex-start'>
                        <Typography variant='h5'>
                            Forgot Password
                        </Typography>
                    </Box>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                            }}
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            fullWidth
                            disabled={pwdVerified}
                            variant="contained"
                            color="primary"
                            onClick={handleSendOTP}
                            className={classes.submit}
                            disabled={Object.entries(formErrors || {}).length > 0}
                        >
                            Send OTP
                        </Button>
                        <Grid container className={classes.infoContainer}>
                            <Typography variant="body2" color="secondary">
                            * An OTP will be sent to your Email.
                            </Typography>
                        </Grid>
                        {pwdVerified ? (
                        <Grid>
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}>
                                Send Reset Link
                                onClick={handleReset}
                            </Button>
                        </Grid>
                        ) : (<div />)}
                    </form>
                </div>
            </Container>
        </div>
    )


}

export default ForgotPassword;