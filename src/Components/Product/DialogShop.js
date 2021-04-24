import React from "react";
import theme from "../../theme";
import {
  Box,
  Card,
  Grid,
  makeStyles,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
  Button,
  DialogActions,
  Menu,
  MenuItem,
  Fab,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { AddShoppingCartOutlined } from "@material-ui/icons";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
  itemImage: {
    margin: theme.spacing(1, 1, 1),
  },
  card: {
    flexDirection: "column",
    padding: theme.spacing(1, 1, 1),
  },
  item: {
    padding: theme.spacing(1, 1, 1),
  },
  price: {
    marginLeft: theme.spacing(1),
  },
  shopName: {
    fontWeight: 700,
  },
  wholesale_price: {
    fontWeight: 600,
    fontSize: 18,
    margin: theme.spacing(1, 0, 1),
  },
});

export default function DialogShop(props) {
  const [scroll] = React.useState("paper");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const token = localStorage.getItem("token");
  const user_type = localStorage.getItem("usertype");

  const handleCancel = () => {
    props.handleDialog();
  };

  const handleAddtoCart = (id) => {
    var data = JSON.stringify({});
    var address = "";
    if (user_type == "1") {
      address = serverUrl + "/cart/";
      data = JSON.stringify({
        product_id: id,
        quantity: props.qty,
        shopId: {},
      });
    } else if (user_type == "0") {
      address = serverUrl + "/retail_cart/";
      data = JSON.stringify({
        retail_product_id: id,
        quantity: props.qty,
      });
    }
    var config = {
      method: "post",
      url: address,
      headers: {
        Authorization: "JWT " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        props.handleDialog();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(props.wholesellers);
  console.log(props.retailers);
  // let a = new Item("Lays and Nachos", "snacks", "", 128, 10);
  // const items = [a, a, a, a, a, a, a, a, a, a];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuId = "shop-filter-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      id={menuId}
      keepMounted
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Nearest</MenuItem>
      <MenuItem onClick={handleMenuClose}>Top Rated</MenuItem>
    </Menu>
  );
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleCancel}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid
            container
            spacing={1}
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={3} container justify="flex-start">
              Available Shops
            </Grid>
            <Grid item container xs={6} justify="flex-end">
              <Button
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        {user_type === "1" ? (
          <DialogContent dividers={scroll === "paper"}>
            {props.wholesellers.length > 0 ? (
              props.wholesellers.map((wholesaler, index) => (
                <Grid item key={wholesaler.id} className={classes.item}>
                  <Card variant="outlined" className={classes.card}>
                    <Grid
                      container
                      justify="center"
                      direction="column"
                      alignItems="flex-start"
                    >
                      {/* <Box className={classes.itemImage}>
                        <Imgix
                            src='https://www.supermarketdisplayracks.com/assets/img/gallery-page/2.jpg'
                            width='30%'
                            imgixParams={{
                            fit: "fit",
                            fm: "jpg",
                            }}
                        />
                      </Box> */}
                      <Grid container direction="row" spacing={2}>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Typography
                                align="left"
                                variant="subtitle1"
                                className={classes.shopName}
                              >
                                {wholesaler.shopName}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                align="left"
                                variant="body2"
                                className={classes.location}
                              >
                                {wholesaler.shopId.address}
                              </Typography>
                              <Typography
                                align="left"
                                variant="body2"
                                className={classes.distance}
                              >
                                {wholesaler.shopLong}
                              </Typography>
                              <Typography
                                align="left"
                                variant="body2"
                                className={classes.distance}
                              >
                                $ {wholesaler.wholesale_price}
                              </Typography>
                              <Rating
                                name="read-only"
                                readOnly
                                value={wholesaler.rating}
                                precision={0.1}
                                //className={classes.rating}
                              />
                            </Grid>
                            <Typography
                              align="left"
                              variant="body2"
                              className={classes.distance}
                            >
                              {wholesaler.shopLong}
                            </Typography>
                            <Typography
                              align="left"
                              variant="body2"
                              className={classes.wholesale_price}
                            >
                              ₹ {wholesaler.wholesale_price}
                            </Typography>
                            <Rating
                              name="read-only"
                              readOnly
                              value={wholesaler.rating}
                              //className={classes.rating}
                            />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Fab
                            padding={2}
                            onClick={() => handleAddtoCart(wholesaler.id)}
                            variant="contained"
                            size="medium"
                            color="secondary"
                          >
                            <AddShoppingCartOutlined></AddShoppingCartOutlined>
                            <Typography>Add to Cart</Typography>
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                align="center"
                variant="body2"
                className={classes.distance}
              >
                No available shops :(
              </Typography>
            )}
          </DialogContent>
        ) : (
          <DialogContent dividers={scroll === "paper"}>
            {props.retailers.length > 0 ? (
              props.retailers.map((retailer, index) => (
                <Grid item key={retailer.id} className={classes.item}>
                  <Card variant="outlined" className={classes.card}>
                    <Grid
                      container
                      justify="center"
                      direction="column"
                      alignItems="flex-start"
                    >
                      {/* <Box className={classes.itemImage}>
                        <Imgix
                            src='https://www.supermarketdisplayracks.com/assets/img/gallery-page/2.jpg'
                            width='30%'
                            imgixParams={{
                            fit: "fit",
                            fm: "jpg",
                            }}
                        />
                      </Box> */}
                      <Grid container direction="row" spacing={2}>
                        <Grid item>
                          <Grid container direction="column">
                            <Typography
                              align="left"
                              variant="subtitle1"
                              className={classes.shopName}
                            >
                              {retailer.shopName}
                            </Typography>
                            <Typography
                              align="left"
                              variant="body2"
                              className={classes.location}
                            >
                              {retailer.shopId.address}
                            </Typography>
                            <Typography
                              align="left"
                              variant="body2"
                              className={classes.wholesale_price}
                            >
                              ₹ {retailer.retail_price}
                            </Typography>
                            <Rating
                              name="read-only"
                              readOnly
                              value={retailer.rating}
                              precision={0.1}
                              //className={classes.rating}
                            />
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Fab
                            onClick={() => handleAddtoCart(retailer.id)}
                            variant="contained"
                            size="medium"
                            color="secondary"
                          >
                            <AddShoppingCartOutlined></AddShoppingCartOutlined>
                            Add to Cart
                          </Fab>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography
                align="center"
                variant="body2"
                className={classes.distance}
              >
                No available shops :(
              </Typography>
            )}
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {renderMenu}
    </div>
  );
}
