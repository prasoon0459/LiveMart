import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { AddSharp, LocalMall, RemoveSharp } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import theme from "../../theme";
import React from "react";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import kurkure from "../../img/kurkure.jpeg";
import Imgix from "react-imgix";
import Reviews from "./Reviews";
import DialogShop from "./DialogShop";
import axios from "axios";

const useStyles = makeStyles({
  root: {},
  mainContainer: {
    padding: theme.spacing(2, 2, 2),
  },
  itemNavigation: {
    letterSpacing: 2,
    padding: theme.spacing(1, 2, 1),
    fontSize: 12,
  },
  itemTitle: {
    letterSpacing: 2,
    fontWeight: "800",
    padding: theme.spacing(0, 3, 1),
  },
  imageBtn: {
    padding: theme.spacing(0, 0, 0),
  },
  listImage: {
    width: "60px",
    height: "60px",
    borderRadius: 2,
    padding: theme.spacing(1, 1, 1),
    margin: theme.spacing(1, 1, 1),
  },
  mainImagePaper: {
    width: "350px",
    height: "350px",
    margin: theme.spacing(1, 1, 1),
    padding: theme.spacing(3, 3, 3),
  },
  btn: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  span: {
    textAlign: "center",
    margin: theme.spacing(0, 2, 0),
  },
  productInfo: {
    padding: theme.spacing(2, 2, 2),
  },
  itemName: {
    fontWeight: 800,
  },
  brandName: {
    color: theme.palette.text.hint,
    fontSize: 18,
    margin: theme.spacing(0, 1, 0),
  },
  priceText: {
    fontWeight: 600,
    fontSize: 18,
    margin: theme.spacing(0, 2, 0),
  },
  detailsTitle: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },
  detailsBox: {
    margin: theme.spacing(4, 2, 0),
  },
  buttonAddtoCart: {
    padding: theme.spacing(1, 2, 1),
  },
  textAddtoCart: {
    marginRight: theme.spacing(1),
  },
  variantTextField: {},
  variantBox: {
    margin: theme.spacing(1, 0, 1),
  },
  Divider: {
    margin: theme.spacing(2, 0, 2),
  },
});

const Product = (props) => {
  // const location = useLocation();
  // console.log(props);
  //const [variant, setVariant] = React.useState("200mg");
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const [showDialog, setShowDialog] = React.useState(false);
  const classes = useStyles(mobile);
  //const variants = ["100mg", "200mg", "300mg", "400mg"];
  const [quantity, setQuantity] = React.useState(1);
  const [product, setProduct] = React.useState([]);

  const token = localStorage.getItem("token");
  const productUrl = localStorage.getItem("product");
  const user_type = localStorage.getItem("usertype");

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrease = () => {
    setQuantity(quantity - 1);
  };

  const handleDialog = () => {
    setShowDialog(!showDialog);
  };

  // const handleProductVariantChange = (event) => {
  //   setVariant(event.target.value);
  // };

  const getProduct = () => {
    var config = {
      method: "get",
      url: productUrl,
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    try {
      getProduct();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const images = ["#a0e0ff", "red", "orange", "blue", "green"];
  return (
    <div className={classes.root}>
      {console.log("product:", product)}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="subtitle1" className={classes.itemNavigation}>
            Home / Products / Milk / Amul Milk
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignContent="center"
        alignItems="flex-start"
        className={classes.mainContainer}
      >
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction={
              screen === "xs" || screen === "sm" ? "column-reverse" : "row"
            }
            alignItems={
              screen === "xs" || screen === "sm" ? "center" : "flex-start"
            }
            justify="center"
          >
            {/* <Grid item>
              <Grid
                container
                direction={
                  screen === "xs" || screen === "sm" ? "row" : "column"
                }
              >
                {images.map((image) => (
                  <Button className={classes.imageBtn}>
                    <Paper
                      className={classes.listImage}
                      style={{ backgroundColor: image }}
                    ></Paper>
                  </Button>
                ))}
              </Grid>
            </Grid> */}
            <Grid item>
              <Paper elevation={2} className={classes.mainImagePaper}>
                {product.length === 0 ? (
                  <CircularProgress />
                ) : (
                  <Imgix
                    className={classes.mainImage}
                    src={product.image}
                    imgixParams={{
                      fit: "fit",
                      fm: "svg",
                    }}
                    height="100%"
                  ></Imgix>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            className={classes.productInfo}
          >
            <Grid
              className={classes.titlesContainer}
              container
              width="100%"
              direction="column"
              alignItems="flex-start"
            >
              <Typography variant="h5" className={classes.itemName}>
                {product.name}
              </Typography>
              <Typography variant="body1" className={classes.brandName}>
                {product.shopName}
              </Typography>
            </Grid>
            {/* <Box component="fieldset" borderColor="transparent">
              <Rating
                name="read-only"
                value={product.rating}
                precision={0.1}
                readOnly
              />
            </Box> */}
            {/* <Typography variant='body1' className={classes.priceText}>$ {product.wholesale_price} / {product.unit}</Typography> */}
            <Divider width="100%" className={classes.Divider}></Divider>
            <Grid
              container
              spacing={2}
              className={classes.variantBox}
              flexDirection="row"
              width="100%"
              justify="flex-start"
              alignItems="flex-start"
            >
              {/* <Grid item xs ={12} sm={6}>
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
                                </Grid> */}
              <Grid item xs={12} sm={6}>
                <Grid
                  container
                  direction="column"
                  alignItems="flex-start"
                  className={classes.cartitemQty}
                >
                  <Grid item xs={12}>
                    <Grid
                      className={classes.root}
                      container
                      direction="row"
                      alignItems="center"
                    >
                      <Button
                        xs={4}
                        className={classes.btn}
                        onClick={handleQuantityDecrease}
                        variant="outlined"
                      >
                        <RemoveSharp></RemoveSharp>
                      </Button>
                      <span xs={4} className={classes.span}>
                        {quantity}
                      </span>
                      <Button
                        xs={4}
                        className={classes.btn}
                        onClick={handleQuantityIncrease}
                        variant="outlined"
                      >
                        <AddSharp></AddSharp>
                      </Button>
                    </Grid>
                  </Grid>
                  <Typography
                    className={classes.cartItemQtyInfo}
                    variant="body2"
                  >
                    Note - ({quantity} {product.unit})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Box className={classes.purchaseBox} width="100%">
              <Grid container direction="row">
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.buttonAddtoCart}
                  fullWidth
                  onClick={handleDialog}
                  endIcon={<LocalMall />}
                >
                  <Typography className={classes.textAddtoCart}>
                    Select {user_type === "1" ? "Wholesaler" : "Retailer"}
                  </Typography>
                </Button>
              </Grid>
            </Box>
            <Box className={classes.detailsBox}>
              <Typography
                align="left"
                variant="body1"
                className={classes.detailsTitle}
              >
                Product Details
              </Typography>
              <Typography align="left">{product.details}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {user_type === "1" ? (
        <Reviews shops={product.wholesellers}></Reviews>
      ) : (
        <Reviews shops={product.retailers}></Reviews>
      )}

      {showDialog ? (
        <DialogShop
          handleDialog={handleDialog}
          wholesellers={product.wholesellers}
          retailers={product.retailers}
          qty={quantity}
        />
      ) : null}
    </div>
  );
};

export default Product;
