import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {Paper ,Avatar,Button, TextField,Badge} from "@material-ui/core";
import Avat from '../../img/avatar.jpg';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    paper:{
      height:'auto',
      flex:'0',
      overflowWrap:'anywhere'
    },
    avatar: {
      margin: theme.spacing(1),
      width: theme.spacing(18),
      height: theme.spacing(18),
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
        height:"auto"
    },
  },
    left:{
      padding:theme.spacing(1),
      textAlign:'left',
      //overflowWrap:'anywhere'
    },
    button:{
        height:'auto',
        width:'auto',
        [theme.breakpoints.down("xs")]: {
            fontSize:'8px'
        },
    },
    value:{
        margin:theme.spacing(1,0,0,1),
        padding:theme.spacing(1,1,0,1)
    },
    input:{
        display:'none'
    },
    badge:{
        border: `2px solid ${theme.palette.background.paper}`,
        width: 25,
        height: 25,
    },
    icon:{
        width:16,
        height:16
    }
  }));
  
export default function Info() {
    const classes = useStyles();
    const [edit,setEdit]=React.useState(false);

    return (
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Grid container spacing={2} direction="column" justify='flex-start' alignItems='baseline' className={classes.left}>
                    {edit?<Grid item xs={12}><input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <Badge
                        overlap="circle"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }}
                        badgeContent={<PhotoCamera className={classes.badge}/>}
                    >
                    <label htmlFor="icon-button-file">
                      <Avatar alt="Harsh Heda" src={Avat} className={classes.avatar}/>
                      </label>
                      </Badge>
                      </Grid>:<Grid item xs={12}><Avatar alt="Harsh Heda" src={Avat} className={classes.avatar}/> </Grid>}
                    <Grid item xs={12}>
                        <Grid container spacing={1} className={classes.value}>
                            <Grid item>
                                <Typography>Name:</Typography>
                            </Grid>
                            <Grid item>
                            {edit?<TextField
                                     variant="outlined"
                                     fullWidth
                                    id="name"
                                    name="Name"
                                    size="small"
                                    InputProps={{
                                        className:classes.valueName
                                    }}/>
                                    :<Typography>John Doe</Typography>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container spacing={1} className={classes.value}>
                            <Grid item>
                                <Typography>Contact:</Typography>
                            </Grid>
                            <Grid item>
                            {edit?<TextField
                                     variant="outlined"
                                     fullWidth
                                    id="contact"
                                    name="Contact"
                                    size="small"
                                    InputLabelProps={{
                                    }}/>
                                    :<Typography>0123456789</Typography>}
                            
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    <Grid container spacing={1} className={classes.value}>
                            <Grid item>
                                <Typography>Address:</Typography>
                            </Grid>
                            <Grid item>
                            {edit?<TextField
                                     variant="outlined"
                                     fullWidth
                                    id="address"
                                    name="Address"
                                    size="small"
                                    InputLabelProps={{
                                    }}/>
                                    :<Typography>BITS PILANI HYDERABAD CAMPUS</Typography>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justify='center'>
                    {edit?<Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={()=>setEdit(false)}
                        >
                        Submit
                        </Button>:
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<EditIcon className={classes.icon}/>}
                            onClick={()=>setEdit(true)}
                        >
                        Edit
                        </Button>
                    }
                    </Grid>
                  </Grid>
                </Paper>
            </Grid>
    )
}