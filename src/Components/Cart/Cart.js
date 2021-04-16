import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Typography,
  } from "@material-ui/core";
  import React from 'react'
  import theme from "../../theme";
  import ReactRoundedImage from 'react-rounded-image'
  import UseWindowDimensions from '../../utils/UseWindowDimensions'
  import fruits from '../../img/personalCare.png'
import { ArrowDropDown, ArrowRight, DeleteForeverOutlined, DeleteOutlined, ExpandMore, ExpandMoreOutlined, ShoppingCart, ShoppingCartOutlined, ShoppingCartSharp } from "@material-ui/icons";
import Imgix from "react-imgix";
import kurkure from '../../img/kurkure.jpeg'
import Quantity from "../../utils/Quantity";

const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile || props.sm?theme.spacing(0, 0, 0): theme.spacing(3,8,3),
      },
      itemsContainer:{
        padding:(props)=>props.sm||props.mobile?theme.spacing(2,0,0): theme.spacing(4,5,0),
      },
      cartInfoText:{
        margin:theme.spacing(0,0,2)
      },
      cartItem:{
        width:'100%',
        padding:theme.spacing(0,1,0)
      },
      icon:{
        width:'40px',
        height:'40px'
      },
      media:{
          paddingTop:'100%'
      },
      divider:{
        margin:theme.spacing(3,0,3)
      },
      cartItemsContainer:{
        width:'100%',
        margin:(props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(2,2,2),
        padding:theme.spacing(2,2,2),
      },
      title:{
        fontWeight:500,
        letterSpacing:2,
        margin:(props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(2,2,1),
        padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
      },
      categoryItem:{
          padding: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
      },
      categoryName:{
          margin: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
      },
      cartItemTitle:{
          fontWeight:500,
          fontSize: '16'
      },
      cartItemVariant:{
          fontSize: '16'
      },
      cartItemRemoveButton:{
        margin:(props) => props.mobile ?theme.spacing(1,1,0):theme.spacing(1,1,1)
      },
      cartItemSellerName:{
          fontSize: '16',
          margin:(props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1,0,1),
          color:theme.palette.text.hint
      },
      cartItemPrice:{
          fontWeight:600,
          margin:theme.spacing(2,0,2), 
          fontSize:'16',
      },
      cartitemQty:{
          margin:(props) => props.mobile ?theme.spacing(1,1,0):theme.spacing(1,1,1)
      },
      cartItemQtyInfo:{
          color:theme.palette.text.hint,
          fontSize:12,
          margin:theme.spacing(0,1,0)
      },
      billCostInfo:{
        color:theme.palette.text.hint
      },
      floatingLabelFocusStyle: {
        color: theme.palette.text.hint,
      },
      billHead:{
          margin:theme.spacing(1,1,1)
      },
      billPaper:{
          padding:theme.spacing(2,2,2),
          margin:theme.spacing(3,1,2),
          borderRadius:10
      },
      couponInput:{
          margin:theme.spacing(2,0,1)
      },
      billDetails:{
          padding:theme.spacing(1,1,1)
      },
      checkoutBtn:{
        margin:theme.spacing(2,0,2)
      },
      itemDetails:{
          margin:(props) => props.mobile ?theme.spacing(2,0,0):theme.spacing(0,0,0)
      },
      itemCard:{
          padding:theme.spacing(0,2,0)
      }

})

const Cart = () =>{
    const categories = [1, 2, 3, 4, 5, 6, 7, 8,3, 4, 5, 6, 7, 8];
    const items = [1,2,3]
    const [couponExpanded, setCouponExpanded]=React.useState(false);
    const screen = UseWindowDimensions().screen;
    console.log(screen)
    const mobile= screen==='xs'
    const sm= screen==='sm'

    const handleCouponExpandClick = ()=>{
        setCouponExpanded(!couponExpanded)
    }

    const classes=useStyles({mobile:mobile, sm:sm});
    console.log(mobile)

    return(
        <div>
            <Grid container direction="column" className={classes.root}>
                <Grid container direction='row' alignItems='center'>
                    <Typography variant={mobile?'h6':'h5'} align="left" className={classes.title}>
                        Shopping Cart
                    </Typography>
                </Grid>

                <Divider></Divider>

                <Grid container direction='row' justify='center'>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Box className={classes.cartItemsContainer} >
                                <Typography variant='subtitle1' align='left' className={classes.cartInfoText}>Your Cart contains 3 item(s) </Typography>
                                <Grid container direction='column' alignItems='flex-start'>
                                    {items.map((item)=>(
                                        <Grid item className={classes.cartItem}>
                                            
                                            <Grid container direction='row' alignItems='flex-start'>
                                                <Grid item xs={12} sm={4} className={classes.itemCard}>
                                                <Card >
                                                    <CardActionArea>
                                                        <CardContent>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={kurkure}
                                                            />
                                                        </CardContent>
                                                    </CardActionArea>
                                                </Card>
                                                </Grid>
                                                <Grid item xs={12} sm={8}>
                                                    <Grid container direction='column' alignItems='flex-start' className={classes.itemDetails}>
                                                        
                                                        <Typography variant='h5' align='left' className={classes.cartItemTitle}>Kurkure Masala Munch</Typography>
                                                        <Typography variant='subtitle1' className={classes.cartItemVariant}>100g</Typography>
                                                        <Typography variant='subtitle1' className={classes.cartItemSellerName}>by Agarwal General Store</Typography>
                                                        <Grid container direction='row' width='100%' alignItems='flex-start'>
                                                            <Button variant='outlined'  
                                                                className={classes.cartItemRemoveButton} 
                                                                startIcon={<DeleteOutlined  />}>
                                                                    Remove Item
                                                            </Button>
                                                            
                                                        </Grid>
                                                        <Typography variant='h6' className={classes.cartItemPrice}>$ 785.43</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Divider className={classes.divider}></Divider>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md ={4}>
                        <Grid container direction='column'>
                        <Paper className={classes.billPaper}>
                            <Grid container direction='column'>
                                <Typography variant='h6' classname={classes.billHead} align='left'>Price Details </Typography>
                                <Grid container direction='row' width='100%' className={classes.billDetails}>
                                    <Box flexGrow={1} justifyContent='flex-start'><Typography align='left' className={classes.billCostInfo} >Total Cost:</Typography></Box>
                                    <Box><Typography className={classes.billCostInfo}>$ 878.40</Typography></Box>
                                </Grid>
                                <Grid container direction='row' width='100%' className={classes.billDetails}>
                                    <Box flexGrow={1} justifyContent='flex-start'><Typography align='left' className={classes.billCostInfo} >Delivery:</Typography></Box>
                                    <Box><Typography className={classes.billCostInfo}>$ 52.95</Typography></Box>
                                </Grid>

                                <Divider></Divider>

                                <Grid container direction='row' width='100%' className={classes.billDetails}>
                                    <Box flexGrow={1} justifyContent='flex-start'><Typography align='left'  >Total Amount:</Typography></Box>
                                    <Box><Typography >$ 1792.95</Typography></Box>
                                </Grid>

                                <Button variant='contained' className={classes.checkoutBtn} color='secondary'>Checkout</Button>
                            </Grid>
                        </Paper>
                        <Paper className={classes.billPaper}>
                            <Grid container direction='row' width='100%' alignItems='center'>
                                <Box flexGrow={1}><Typography variant='h6' classname={classes.billHead} align='left'>Have a coupon code? </Typography></Box>
                                <Box><IconButton onClick={handleCouponExpandClick}><ExpandMoreOutlined></ExpandMoreOutlined></IconButton></Box>
                            </Grid>
                            {couponExpanded?
                                <Grid container direction='column'>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="coupon_code"
                                        label="Coupon Code"
                                        type="text"
                                        id="text"
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                    />
                                    <Button variant='contained' className={classes.checkoutBtn} color='secondary'>Apply</Button>
                                </Grid>
                            :<div/>}
                        </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
export default Cart;