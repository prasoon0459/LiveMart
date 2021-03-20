import React, { Component } from 'react';
import Slider from 'infinite-react-carousel';
import Image from 'material-ui-image'
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles({
    image:{
        width:'100vw',
        height:'40vh',
    }
})

const Home =()=>{
    const classes=useStyles();

    const images=[
        'https://scatterjar.com/wp-content/uploads/2016/09/www.scatterjar.com-3691-1024x683.jpg',
        'https://scatterjar.com/wp-content/uploads/2016/09/www.scatterjar.com-3909-1-1024x683.jpg',
        'https://scatterjar.com/wp-content/uploads/2016/11/www.scatterjar.com-4571-1024x683.jpg'
    ]
    const settings =  {
        arrows:false,
      autoplay: true,
      centerMode: true,
      centerPadding: 30,
      dots: true,
      initialSlide: true,
    //   wheel: true
    };
    return (
      <div>
        <Slider { ...settings }>
            {images.map((image)=>(
               <div className={classes.image} styles={{ backgroundImage:`url(${image})`, backgroundSize:'100% 100%'}}>
                   {/* <Image  src={process.env.PUBLIC_URL+'/img/'+image}></Image> */}
               </div> 
            ))}
        </Slider>
      </div>
    );
}

export default Home;