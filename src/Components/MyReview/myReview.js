import { Grid, makeStyles, Paper, Typography, } from "@material-ui/core"
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import Rating from "@material-ui/lab/Rating";
import RateReviewIcon from '@material-ui/icons/RateReview';
const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 3, 1),
    },
    ordersContainer: {
        padding: (props) => props.sm || props.mobile ? theme.spacing(2, 0, 0) : theme.spacing(4, 5, 0),
    },
    orderPaper: {
        width: '100%',
        margin: theme.spacing(1, 1, 1),
        padding: theme.spacing(2, 2, 2),
        maxWidth: '992px'
    },
    orderItems: {
        margin: theme.spacing(2, 2, 2)
    },
    storeIcon: {
        margin: (props) => props.mobile ? theme.spacing(3, 1, 0) : theme.spacing(3.5, 1, 0),
        //padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
    },
    orderStatus: {
        fontSize: 18,
        letterSpacing: 1,
        margin: theme.spacing(1, 0, 1),
        fontWeight: "bold"
    },
    orderStatusItem: {
        flexGrow: 1,
    },
    rating: {
        margin: theme.spacing(0, 0, 2)
    },
    orderDeliveryDate: {
        fontSize: 18,
        letterSpacing: 1,
        fontWeight: 600,
        margin: theme.spacing(0, 1, 1)
    },
    orderTotalPrice: {
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 500,
        margin: theme.spacing(0, 1, 1)
    },
    reviewText: {
        margin: theme.spacing(0, 0, 2, 0)
    },
    orderStoreName: {
        margin: theme.spacing(2, 2, 2),
        fontWeight: "bold"
    },
    title: {
        fontWeight: 500,
        letterSpacing: 2,
        margin: (props) => props.mobile ? theme.spacing(2, 1, 2) : theme.spacing(1, 2, 1),
        padding: (props) => props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
    },

})

const MyReviews = () => {
    const screen = UseWindowDimensions().screen;
    const mobile = screen === 'xs'
    const sm = screen === 'sm'
    const classes = useStyles({ mobile: mobile, sm: sm });

    const orders = [1, 1, 1, 1, 1, 1]
    const rating = 4
    return (
        <div className={classes.root}>
            <Grid container direction="column" alignItems='center' className={classes.root}>
                <Grid container direction='row' alignItems='center' justify='center'>
                    <RateReviewIcon />
                    <Typography variant={mobile ? 'h6' : 'h5'} align="center" className={classes.title}>
                        My Reviews
                    </Typography>
                </Grid>
                <Grid container direction='column' alignItems='center' className={classes.ordersContainer}>
                    {orders.map((order) => (
                        <Paper className={classes.orderPaper}>
                            <Grid container alignItems='center' direction='row'>

                                <Grid item className={classes.orderStatusItem}>
                                    <Typography className={classes.orderStatus} align='left'>M/s Agarwal General Store </Typography>
                                </Grid>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    readOnly
                                    className={classes.rating}
                                />
                            </Grid>
                            <Grid container className={classes.orderItems} direction='column'>
                                <Grid item>
                                    <Typography className={classes.reviewText} align='left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nibh dui, laoreet sed erat sit amet, condimentum efficitur eros. Vivamus dignissim, purus ac pharetra tincidunt, neque tortor fringilla urna, vitae aliquam tortor velit quis odio. Curabitur mattis, nisl a tristique sagittis, orci felis porta lectus, sed rhoncus lectus tortor at massa. Suspendisse mollis orci in felis laoreet dignissim.</Typography>
                                </Grid>
                            </Grid>
                            <Grid container direction='row' alignItems='center'>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="caption" display="block" gutterBottom align='left'>Date: 23rd March 2021</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    ))}
                </Grid>
            </Grid>
        </div>
    )

}

export default MyReviews;