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
    const [token, setToken] = React.useState('');


    // const handleToken = (e) => {
    //     setToken(e.target.value);
    // };
    const handleEmail =(e)=>{
        setEmail(e.target.value);
        console.log(email);
    }
    const handleReset = () => {
        var data = new FormData();
        data.append('email', 'scamazon.oops.123@gmail.com');
        data.append('password', 'shauryavj');

        var config = {
        method: 'post',
        url: serverUrl+'/account/login/',
        data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setToken(response.data.token);

            var data2 = new FormData();
            data2.append('email', email);
            data2.append('token', token);

            var config2 = {
            method: 'post',
            url: serverUrl+'/account/sendresetmail/',
            data : data2
            };

            axios(config2)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
        })
        .catch(function (error) {
        console.log(error);
        });
    };

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
                            onChange={handleEmail}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle
                            }}
                            autoComplete="email"
                            autoFocus
                        />
                        <Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleReset}
                                >
                                Send Reset Link
                            </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    )


}

export default ForgotPassword;