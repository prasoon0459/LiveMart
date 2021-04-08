import { Box, Divider, Grid,TextField, LinearProgress, makeStyles, Paper, Typography, Button, IconButton } from "@material-ui/core"
import { AccountCircle, AccountCircleRounded, StarOutline, StarOutlined, StarRounded } from "@material-ui/icons"
import Rating from "@material-ui/lab/Rating"
import theme from "../../theme"
import React from 'react'
import LinearWithValueLabel from "../../utils/LinearProgressWithLabel"
import UseWindowDimensions from "../../utils/UseWindowDimensions"

const useStyles=makeStyles({
    root:{
        margin:(props) => props? theme.spacing(2,1,2):theme.spacing(0,4,0)
    },
    customerRvwPaper:{
        margin: (props) => props?theme.spacing(1,0,1):theme.spacing(1,1,1),
        padding:(props) => props?theme.spacing(2,1,2):theme.spacing(1,1,1),
        width:'100%'
    },

    floatingLabelFocusStyle: {
        color: theme.palette.text.hint,
    },
    reviewHead:{
        width:'100%'
    },  
    divider:{
        width:'100%',
        margin:theme.spacing(1,0,1)
    },
    star:{
        fill:theme.palette.primary.star
    },
    indStars:{
        margin:theme.spacing(0,2,0)
    },
    rating:{
        margin:theme.spacing(0,0,2)
    },
    customerName:{
        margin:theme.spacing(0,2,0),
        fontWeight:500
    },
    reviewText:{
        margin:theme.spacing(2,2,2)
    },
    writeReviewInput:{
        height:'100px',
    },
    reviewContainer:{
        width:'100%',
        padding:(props) => props?theme.spacing(0,1,0):theme.spacing(0,3,0)  
    },
    new_accountCircleBox:{
        marginRight:theme.spacing(1)
    },
    new_userNameBox:{
        margin:theme.spacing(0,1,0)
    },
    new_postButtonBox:{
        margin:theme.spacing(0,1,0)
    },
    new_textfieldContainer:{
        margin:theme.spacing(0)
    },
    new_userNameText:{
        fontWeight:600
    }
})

const Reviews = (props) => {
    const rating =4

    const mobile=UseWindowDimensions().screen==='xs'

    const [newRating,setNewRating] = React.useState(0.0)

    const classes = useStyles(mobile)
    const reveiws = [1,1,1,1]
    
    return(
        <div className={classes.root}>
            <Grid container direction='column' alignItems='flex-start' >
                <Grid item className={classes.reviewHead}>
                    <Grid container  direction='column' alignItems='flex-start'>
                        <Typography variant='h6'>Customer Reviews</Typography>
                        <Divider className={classes.divider}></Divider>
                    </Grid>
                </Grid>
                <Grid item className={classes.rating} >
                    <Grid container  direction='column' alignItems='flex-start'  >
                        <Rating 
                            name="simple-controlled"
                            value={rating}
                            readOnly
                            className={classes.rating}
                        />
                        <Box width='200px' alignItems='center' flexDirection='row' className={classes.indStars}>
                            <Box><Typography align='left'>5 star</Typography></Box>
                            <Box><LinearWithValueLabel  variant="determinate" progress={50} /></Box>
                        </Box>
                        <Box width='200px' alignItems='center' flexDirection='row' className={classes.indStars}>
                            <Box><Typography align='left'>4 star</Typography></Box>
                            <Box><LinearWithValueLabel  variant="determinate" progress={30} /></Box>
                        </Box>
                        <Box width='200px' alignItems='center' flexDirection='row' className={classes.indStars}>
                            <Box><Typography align='left'>3 star</Typography></Box>
                            <Box><LinearWithValueLabel  variant="determinate" progress={10} /></Box>
                        </Box>
                        <Box width='200px' alignItems='center' flexDirection='row' className={classes.indStars}>
                            <Box><Typography align='left'>2 star</Typography></Box>
                            <Box><LinearWithValueLabel  variant="determinate" progress={8} /></Box>
                        </Box>
                        <Box width='200px' alignItems='center' flexDirection='row' className={classes.indStars}>
                            <Box><Typography align='left'>1 star</Typography></Box>
                            <Box><LinearWithValueLabel  variant="determinate" progress={2} /></Box>
                        </Box>
                        
                    </Grid>
                </Grid>

                <Paper elevation={3} className={classes.customerRvwPaper}>
                    <Grid container direction='column' alignItems='flex-start'  className={classes.reviewContainer} >
                        <div style={{ width: '100%' }}>
                            <Box display='flex' mt={2} alignItems='center' >
                                <Box className={classes.new_accountCircleBox}><AccountCircle></AccountCircle></Box>
                                <Box flexGrow={1} className={classes.new_userNameBox}><Typography className={classes.new_userNameText} align='left'>Prasoon Baghel</Typography></Box>
                                <Box className={classes.new_postButtonBox} >
                                    <Grid container  direction='row-reverse'>
                                        <Button variant='outlined'>POST </Button>
                                    </Grid>
                                </Box>
                            </Box>
                            <Box display='flex' mt={2} alignItems='center'>
                            <Rating 
                                name="simple-controlled"
                                className={classes.rating}
                            />
                            </Box>
                        </div>
                        <Box width='100%' className={classes.new_textfieldContainer}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="add_review"
                                label="Write something (optional)"
                                type="text"
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                inputProps={{
                                    className: classes.writeReviewInput
                                }}
                            />
                        </Box>

                    </Grid>
                </Paper>

                {reveiws.map((review)=> (
                    <Paper elevation={1} className={classes.customerRvwPaper}>
                        <Grid container direction='column' alignItems='flex-start' width='100%' >
                            <Grid container direction='row' width='100%' alignItems='center' >
                                <AccountCircle></AccountCircle>
                                <Grid item><Typography className={classes.customerName} noWrap>Prasoon Baghel</Typography></Grid>
                                <Rating 
                                    value={5}
                                    readOnly
                                />
                            </Grid>
                            <Typography className={classes.reviewText} align='left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh dui, laoreet sed erat sit amet, condimentum efficitur eros. Vivamus dignissim, purus ac pharetra tincidunt, neque tortor fringilla urna, vitae aliquam tortor velit quis odio. Curabitur mattis, nisl a tristique sagittis, orci felis porta lectus, sed rhoncus lectus tortor at massa. Suspendisse mollis orci in felis laoreet dignissim. </Typography>

                        </Grid>
                    </Paper>
                ))}
                
            </Grid>
        </div>
    )

}
export default Reviews;