import { Box, Button, Divider, Grid, IconButton, makeStyles, MenuItem, Paper, TextField, Typography } from "@material-ui/core"
import { AddOutlined, AddShoppingCartOutlined, Remove, RemoveOutlined, ShoppingCartOutlined } from "@material-ui/icons"
import Rating from '@material-ui/lab/Rating'
import theme from "../../theme"
import React from 'react'
import UseWindowDimensions from '../../utils/UseWindowDimensions'

const useStyles= makeStyles({
    root:{

    },
    mainContainer:{
        padding:theme.spacing(2,2,2)
    },
    itemNavigation: {
        letterSpacing: 2,
        padding: theme.spacing(1, 2, 1),
        fontSize:12
    },
    itemTitle: {
        letterSpacing: 2,
        fontWeight: "800",
        padding: theme.spacing(0, 3, 1),
    },
    imageBtn:{
        padding:theme.spacing(0,0,0)
    },
    listImage:{
        width:'60px',
        height:'60px',
        borderRadius:2,
        padding:theme.spacing(1,1,1),
        margin:theme.spacing(1,1,1)
    },
    mainImage:{
        width:'350px',
        height:'350px',
        margin:theme.spacing(1,1,1),
    },
    productInfo:{
        padding:theme.spacing(2,2,2)
    },
    itemName:{
        fontWeight:800,
        color:theme.palette.text.blueText
    },
    brandName:{
        color:theme.palette.text.hint,
        fontSize:18,
        margin:theme.spacing(0,1,0)
    },
    priceText:{
        fontWeight:600,
        fontSize:18,
        margin:theme.spacing(0,2,0)
    },
    detailsTitle:{
        fontWeight:500,
        marginBottom:theme.spacing(2)
    },
    detailsBox:{
        margin:theme.spacing(4,2,2)
    },
    buttonAddtoCart:{
        padding:theme.spacing(1,2,1),
    },
    textAddtoCart:{
        marginRight:theme.spacing(1)
    },
    variantTextField:{

    },
    variantBox:{
        margin:theme.spacing(1,0,1)
    },
    Divider:{
        margin:theme.spacing(2,0,2)
    }
})

const Product = () => {
    const classes = useStyles()
    const [variant, setVariant]=React.useState('200mg');
    const screen= UseWindowDimensions().screen;
    const variants=['100mg','200mg','300mg','400mg']
    const handleProductVariantChange = (event) => {
        setVariant(event.target.value)
    }

    const images=['#a0e0ff', 'red', 'orange', 'blue', 'green']
    return(
        <div className={classes.root}>
            <Grid container direction='column'
                justify="center"
                alignItems="flex-start">
                <Grid item>
                    <Typography
                        variant="subtitle1"
                        className={classes.itemNavigation}
                    >
                        Home / Products / Milk / Amul Milk
                    </Typography>
                </Grid>
            </Grid>
            <Grid container direction='row' 
                justify='center' 
                alignContent='center' 
                alignItems='flex-start'
                className={classes.mainContainer}>
                <Grid item xs ={12} md={6}>
                    <Grid container
                        direction={screen==='xs'||screen==='sm'?'column-reverse':'row'}
                        alignItems={screen==='xs'||screen==='sm'?'center':'flex-start'}
                        justify='center'>
                            <Grid item >
                                <Grid container direction={screen==='xs'||screen==='sm'?'row':'column'} >
                                    {images.map((image)=>(
                                        <Button className={classes.imageBtn}>
                                            <Paper  className={classes.listImage} style={{backgroundColor: image}}></Paper>
                                        </Button>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item >
                                <Paper elevation={2} className={classes.mainImage} style={{backgroundColor: '   #ffc3a0'}}></Paper>
                            </Grid>
                    </Grid>
                </Grid>
                <Grid item xs ={12} md={6}>
                    <Grid container direction='column' justify='flex-start' alignItems='flex-start' className={classes.productInfo}>
                        <Grid className={classes.titlesContainer} container width='100%' direction='column' alignItems='flex-start' >
                            <Typography variant='h5' className={classes.itemName}>Too Yumm Karare</Typography>
                            <Typography variant='body1' className={classes.brandName}>Parle</Typography>
                        </Grid>
                        <Box component="fieldset" borderColor="transparent">
                            <Rating name="read-only" value={3.5 } precision={0.5} readOnly />
                        </Box>
                        <Typography variant='body1' className={classes.priceText}>$ 72.40</Typography>
                        <Divider width='100%' className={classes.Divider}></Divider>
                        <Grid container className={classes.variantBox} flexDirection='row' 
                            width='100%' justify='flex-start' alignItems='flex-start'>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    fullWidth
                                    label="Variant"
                                    value={variant}
                                    variant='outlined'
                                    InputLabelProps={{
                                        style: { color: theme.palette.text.primary},
                                    }}
                                    className={classes.variantTextField}
                                    onChange={handleProductVariantChange}
                                    >
                                    {variants.map((option) => (
                                        <MenuItem key={option} value={option}>
                                        {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                        </Grid>
                        <Box className={classes.purchaseBox} width='100%'>
                            <Grid container direction='row' >
                                <Button color='secondary' variant="contained" 
                                className={classes.buttonAddtoCart}
                                fullWidth
                                endIcon={<ShoppingCartOutlined></ShoppingCartOutlined>}>
                                    <Typography className={classes.textAddtoCart}>Add to Cart</Typography>
                                </Button>
                            </Grid>
                        </Box>
                        <Box className={classes.detailsBox} >
                            <Typography align='left' variant='body1' className={classes.detailsTitle}>Product Details</Typography>
                            <Typography align='left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
                        </Box>
                    </Grid>                                        
                </Grid>
                
            </Grid>
        </div>
    )

}

export default Product;