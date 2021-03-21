import { Avatar, Box, Button, Container, CssBaseline, makeStyles, TextField, Typography } from '@material-ui/core';
import Imgix from 'react-imgix';
import forgotpwd from '../../img/forgot_pwd.svg'
import theme from '../../theme';
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
    root:{
        marginTop:'20px',
        height:'70vh'
    },
    image:{
        width:'100vw',
        height:'60vh',
    }
})

const ForgotPassword =()=>{
    const classes= useStyles();

    return(
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
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Send Reset Link
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )


}

export default ForgotPassword;