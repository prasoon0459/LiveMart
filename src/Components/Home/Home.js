import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import original from "../../img/original.svg";
import delivery from "../../img/delivery.svg";
import payment from "../../img/payment.svg";
import theme from "../../theme";
import FeatureItem from "./FeatureItem";
import MainSlider from "./MainSlider";
import CategoryComp from "./CategoryComp";
import TopBrand from "./TopBrands";
import ActiveOrders from "./ActiveOrders";
import PendingOrders from "./PendingOrders";
import Pickups from "./Pickups";

const useStyles = makeStyles({
  root: {
    paddingTop: "1vh",
    backgroundColor: "#f5f5f5",
    paddingBottom: "1vh",
    [theme.breakpoints.down("md")]: {
      // marginTop: theme.spacing(10),
    },
  },
  image: {
    width: "100vw",
    height: "40vh",
  },
  featureContainer: {
    margin: theme.spacing(8, 0, 1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  featureItem: {
    padding: theme.spacing(0, 4, 0),
  },
  deals: {
    margin: theme.spacing(5, 0, 3),
  },
});

const Home = () => {
  // const mobile= useMediaQuery(theme.breakpoints.down('xs'));
  // const user = 'customer'
  const userRole = localStorage.getItem("usertype");
  // const user = 'wholesaler'
  const classes = useStyles();
  const images = [
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/20/70b0cd7c-1f13-4d91-9bac-ac6ba1a6963e1616251205883-desktop-banner-2.jpg",
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/3/17/d5db02ca-8ca7-4258-a4e7-ee5f6b3a357b1615966448151-holi-desktop-banner.jpg",
    "https://www.grocerysumo.com/media/slider/home/fsfhjllz_vegetables-banner.png",
  ];
  console.log(window);
  const categories = [1, 2, 3, 4, 5, 6, 7, 8];

  const settings = {
    arrows: false,
    autoplay: true,
    centerMode: true,
    centerPadding: 30,
    dots: true,
    initialSlide: true,
  };

  return (
    <div className={classes.root}>
      {console.log(userRole)}
      <MainSlider images={images} settings={settings}></MainSlider>
      {userRole === "0" ? (
        <div>
          <ActiveOrders></ActiveOrders>
          <CategoryComp categories={categories}></CategoryComp>
          <TopBrand categories={categories}></TopBrand>
        </div>
      ) : userRole === "1" ? (
        <div>
          <Pickups></Pickups>
          <PendingOrders></PendingOrders>
          <ActiveOrders></ActiveOrders>
          <CategoryComp categories={categories}></CategoryComp>
          <TopBrand categories={categories}></TopBrand>
        </div>
      ) : (
        <div>
          <Pickups></Pickups>
          <PendingOrders></PendingOrders>
          {/* <ActiveOrders></ActiveOrders> */}
        </div>
      )}
      {/* <MostPurchased ></MostPurchased> */}
      {/* {userRole === 2 ? null : (
        <React.Fragment>
          <CategoryComp categories={categories}></CategoryComp>
          <TopBrand categories={categories}></TopBrand>
        </React.Fragment>
      )} */}
      <Grid container className={classes.featureContainer}>
        <Grid item xs={12} md={4} className={classes.featureItem}>
          <FeatureItem
            img={original}
            text="100% ORIGINAL guarantee for all products at LiveMart"
          ></FeatureItem>
        </Grid>
        <Grid item xs={12} md={4} className={classes.featureItem}>
          <FeatureItem
            img={payment}
            text="Easy and secure payments"
          ></FeatureItem>
        </Grid>
        <Grid item xs={12} md={4} className={classes.featureItem}>
          <FeatureItem
            img={delivery}
            text="Fast and Safe delivery at your doorsteps"
          ></FeatureItem>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
