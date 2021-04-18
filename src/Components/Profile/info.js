import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField,Fab } from "@material-ui/core";
import Avat from '../../img/avatar.jpg';
import EditIcon from '@material-ui/icons/Edit';
import {  UpdateOutlined } from "@material-ui/icons";
import ReactRoundedImage from "react-rounded-image";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 'auto',
        flex: '0',
        padding: theme.spacing(2, 2, 2),
        overflowWrap: 'anywhere'
    },
    floatingLabelFocusStyle: {
        color: theme.palette.text.hint,
    },
    margin: {
        margin: theme.spacing(1)
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(18),
        height: theme.spacing(18),
        backgroundColor: theme.palette.secondary.main,
        [theme.breakpoints.down("xs")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
            height: "auto"
        },
    },
    left: {
        padding: theme.spacing(1),
        textAlign: 'left',
        //overflowWrap:'anywhere'
    },
    button: {
        height: 'auto',
        width: 'auto',
        [theme.breakpoints.down("xs")]: {
            fontSize: '8px'
        },
    },
    profileFields: {
        margin: theme.spacing(1, 1, 1)
    },
    value: {
        margin: theme.spacing(1, 0, 0, 1),
        padding: theme.spacing(1, 1, 0, 1)
    },
    input: {
        display: 'none'
    },
    badge: {
        border: `2px solid ${theme.palette.background.paper}`,
        width: 25,
        height: 25,
    },
    icon: {
        width: 16,
        height: 16
    },
    fab: {
        margin: theme.spacing(2, 1, 1)
    },
    editIcon: {
        marginRight: theme.spacing(1)
    }
}));

export default function Info(props) {
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false);
    const [userDetails, setUserDetails] = React.useState({
        name: '',
        mobile: '',
        email: '',
        url: ''
    })
    // const [name, setName] = React.useState('');
    // console.log(props);

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const setDetails = (result) => {
        // console.log(result[0]);
        // setName(result[0].name);
        // console.log(name);
        setUserDetails({name: result[0].name, email: result[0].mail, mobile: result[0].phno, url: result[0].url});
        // console.log(userDetails);
    }

    const getUserDetails = () => {
        var config = {
            method: 'get',
            url: serverUrl + '/account/users/',
            headers: {
                'Authorization': "JWT " + token
            }
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                const result = response.data.filter((val) => username === val.username);
                setDetails(result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleNameChange = (event) => {
        setUserDetails({
            ...userDetails,
            name: event.target.value
        })
    }
    const handleMobileChange = (event) => {
        setUserDetails({
            ...userDetails,
            mobile: event.target.value
        })
    }
    const handleEmailChange = (event) => {
        setUserDetails({
            ...userDetails,
            email: event.target.value
        })
    }

    const handleEditClick = () => {
        setEdit(true)
    }

    const handleUpdateClick = () => {
        var config2 = {
            method: 'get',
            url: userDetails.url,
            headers: {
                'Authorization': 'JWT ' + token
            }
        };

        axios(config2)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            response.data.name = userDetails.name;
            response.data.mail = userDetails.email
            response.data.phno = userDetails.mobile;
            var data = JSON.stringify(response.data)
            
            var config = {
            method: 'put',
            url: userDetails.url,
            headers: { 
                'Authorization': 'JWT ' + token, 
                'Content-Type': 'application/json'
            },
            data : data
            };
        
            axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                response.data.name = userDetails.name;
                response.data.mail = userDetails.email
                response.data.phno = userDetails.mobile;
                var data = JSON.stringify(response.data)

                var config = {
                    method: 'put',
                    url: userDetails.url,
                    headers: {
                        'Authorization': 'JWT ' + token,
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                setEdit(false);
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }).catch(function (error) {
                console.log(error);
                })
        }).catch(function (error) {
            console.log(error);
        })
    }


    React.useEffect(() => {
        try {
            getUserDetails();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (   
        <Grid item xs={12} md={4}>
            {userDetails.name!=='' ? localStorage.setItem('name', userDetails.name) : null}
            <Paper className={classes.paper}>
                <Grid container spacing={2} direction="column" justify='flex-start' alignItems='center' className={classes.left}>
                    <ReactRoundedImage
                        image={Avat}
                        imageWidth="200"
                        imageHeight="200"
                        roundedSize={2}
                    />
                    {/* <InputBase
                        className={classes.margin}
                        defaultValue="Naked input"
                        inputProps={{ 'aria-label': 'naked' }}
                    /> */}
                    <form className={classes.form} noValidate>
                        <TextField
                            focused={edit}
                            margin='normal'
                            id="filled-read-only-input"
                            label="Name"
                            fullWidth
                            value={userDetails.name}
                            onChange={handleNameChange}
                            InputProps={{
                                readOnly: edit ? false : true
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                        <TextField
                            margin='normal'
                            id="filled-read-only-input"
                            label="Mobile No."
                            fullWidth
                            value={userDetails.mobile}
                            onChange={handleMobileChange}
                            InputProps={{
                                readOnly: edit ? false : true
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                        <TextField
                            margin='normal'
                            id="filled-read-only-input"
                            label="Email"
                            fullWidth
                            value={userDetails.email}
                            onChange={handleEmailChange}
                            type='email'
                            InputProps={{
                                readOnly: edit ? false : true
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                        />
                        <Grid container direction='column' alignItems='flex-end'>
                            {edit ?
                                <Fab variant='extended' onClick={handleUpdateClick} size='medium' className={classes.fab} color="secondary" aria-label="edit">
                                    <UpdateOutlined className={classes.editIcon} />
                                    Save
                                </Fab> :
                                <Fab variant='extended' onClick={handleEditClick} size='medium' className={classes.fab} color="secondary" aria-label="edit">
                                    <EditIcon className={classes.editIcon} />
                                    Edit
                                </Fab>
                            }
                        </Grid>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    )
}