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
import { useHistory } from "react-router-dom";
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
  const user_type = localStorage.getItem("usertype");
  const history=useHistory()
  const classes = useStyles();
  const images = [
    {
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,h=560/layout-engine/2021-04/Daily-Essentials-Store_web_0.jpg",
      route: "",
    },
    {
      image:
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,w=1908,h=954/layout-engine/2021-04/Home-Page-Banner_1320x660_Personal-Care-Products-1.jpg",
      route: "",
    },
    {
      image:
        "https://www.bigbasket.com/media/uploads/banner_images/Green_Banganapilli_DT_5_1130x400_9th-24th.jpg",
      route: "",
    },
  ];

  React.useEffect(()=>{ 
    if(user_type==='3'){
      history.push('/delivery_home')
    }
  },[])

  const settings = {
    arrows: false,
    autoplay: true,
    centerMode: true,
    centerPadding: 30,
    dots: true,
    initialSlide: true,
  };

  React.useEffect(() => {
    if (user_type === "3") {
      history.push({ pathname: "/delivery_home" });
    }
  }, []);

  return (
    <div className={classes.root}>
      {(user_type === "0" || user_type === "1") && (
        <MainSlider images={images} settings={settings}></MainSlider>
      )}
      {user_type === "0" ? (
        <div>
          <ActiveOrders></ActiveOrders>
          <CategoryComp></CategoryComp>
          <TopBrand></TopBrand>
        </div>
      ) : user_type === "1" ? (
        <div>
          <Pickups></Pickups>
          <PendingOrders></PendingOrders>
          <ActiveOrders></ActiveOrders>
          <CategoryComp></CategoryComp>
          <TopBrand></TopBrand>
        </div>
      ) : (
        <div>
          <Pickups></Pickups>
          <PendingOrders></PendingOrders>
        </div>
      )}
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
