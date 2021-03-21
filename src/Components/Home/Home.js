import React from 'react';
import {  Grid, makeStyles, Typography } from '@material-ui/core';
import original from '../../img/original.svg'
import delivery from '../../img/delivery.svg'
import payment from '../../img/payment.svg'
import theme from '../../theme'
import FeatureItem from './FeatureItem';
import MainSlider from './MainSlider';
import ItemSlider from './ItemSlider';
import Item from '../../Data/Item'

const useStyles=makeStyles({
    root:{
        marginTop:'20px'
    },
    image:{
        width:'100vw',
        height:'40vh',
    },
    featureContainer:{
        paddingLeft:theme.spacing(5),
        paddingRight:theme.spacing(5),
        marginTop:theme.spacing(5)
    },
    featureItem:{
        padding:theme.spacing(0,4,0)
    },
    deals:{
        margin:theme.spacing(3,0,3)
    }
})

const Home =()=>{
    const classes=useStyles();

    const images=[
        'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/20/70b0cd7c-1f13-4d91-9bac-ac6ba1a6963e1616251205883-desktop-banner-2.jpg',
        'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/17/d5db02ca-8ca7-4258-a4e7-ee5f6b3a357b1615966448151-holi-desktop-banner.jpg',
        'https://www.grocerysumo.com/media/slider/home/fsfhjllz_vegetables-banner.png'
    ]
    let a = new Item('Lays and Nachos','snacks','',128,10);
    const items=[
        a,a,a,a,a,a,a,a,a,a
    ]
    const settings =  {
      arrows:false,
      autoplay: true,
      centerMode: true,
      centerPadding: 30,
      dots: true,
      initialSlide: true,
    };

    const itemSettings={
        
        arrows:true,
        slidesToShow: 5,
        arrowsBlock:false
    }

    return (
      <div className={classes.root}>
        <MainSlider images={images} settings={settings}></MainSlider>
        <Grid container className={classes.featureContainer} direction="column">
            <Grid item>
                <Typography variant='h4' align="left">
                    Deals of the Day
                </Typography>
            </Grid>
            <Grid item className={classes.deals}>
                <ItemSlider items={items} settings={itemSettings}></ItemSlider>
            </Grid>
        </Grid>
        <Grid container className={classes.featureContainer}>
            <Grid item xs={12}md={4} className={classes.featureItem} >
                <FeatureItem img={original} text="100% ORIGINAL guarantee for all products at LiveMart"></FeatureItem>
            </Grid>
            <Grid item xs={12} md={4} className={classes.featureItem} >
                <FeatureItem img={payment} text="Easy and secure payments"></FeatureItem>
            </Grid>  
            <Grid item xs={12} md={4} className={classes.featureItem} >
                <FeatureItem img={delivery} text="Fast and Safe delivery at your doorsteps"></FeatureItem>
            </Grid> 
            
        </Grid>
      </div>
    );
}

export default Home;