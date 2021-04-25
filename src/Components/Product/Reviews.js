/* eslint-disable */

import {
  Box,
  Divider,
  Grid,
  MenuItem,
  TextField,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import theme from "../../theme";
import React from "react";
// import LinearWithValueLabel from "../../utils/LinearProgressWithLabel";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  root: {
    margin: (props) =>
      props ? theme.spacing(2, 1, 2) : theme.spacing(0, 4, 0),
  },
  customerRvwPaper: {
    borderRadius: 10,
    margin: (props) =>
      props ? theme.spacing(1, 0, 1) : theme.spacing(1, 0, 1),
    padding: (props) =>
      props ? theme.spacing(2, 1, 2) : theme.spacing(1, 1, 1),
    width: "100%",
  },

  floatingLabelFocusStyle: {
    color: theme.palette.text.hint,
  },
  reviewHead: {
    width: "100%",
    margin: theme.spacing(2, 0, 0),
  },
  divider: {
    width: "100%",
    margin: theme.spacing(1, 0, 1),
  },
  star: {
    fill: theme.palette.primary.star,
  },
  indStars: {
    margin: theme.spacing(0, 2, 0),
  },
  rating: {
    margin: theme.spacing(0, 0, 2),
  },
  customerName: {
    margin: theme.spacing(0, 2, 0),
    fontWeight: 500,
  },
  reviewText: {
    margin: theme.spacing(2, 2, 2),
  },
  writeReviewInput: {
    height: "100px",
  },
  reviewContainer: {
    width: "100%",
    padding: (props) =>
      props ? theme.spacing(0, 1, 0) : theme.spacing(0, 3, 0),
  },
  new_accountCircleBox: {
    marginRight: theme.spacing(1),
  },
  new_userNameBox: {
    margin: theme.spacing(0, 1, 0),
  },
  new_postButtonBox: {
    margin: theme.spacing(0, 1, 0),
  },
  new_textfieldContainer: {
    margin: theme.spacing(0),
  },
  new_userNameText: {
    fontWeight: 600,
  },
  rvwCont: {
    padding: theme.spacing(0, 2, 0),
  },
});

const Reviews = (props) => {
  const [rating, setRating] = React.useState(0);
  const [review, setReview] = React.useState("");

  const mobile = UseWindowDimensions().screen === "xs";
  const [shops, setShops] = React.useState([]);

  console.log(props);
  const [shopIndex, setShopIndex] = React.useState(0);
  const classes = useStyles(mobile);
  // const reveiws = [1, 1, 1, 1]
  const [reviews, setReviews] = React.useState([]);

  const token = localStorage.getItem("token");
  const productName = localStorage.getItem("productName");
  const name = localStorage.getItem("name");
  //const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [wholesaler, setWholesaler] = React.useState({});
  const [retailer, setRetailer] = React.useState({});
  const user_type = localStorage.getItem("usertype");

  const handleMenuItemClick = (event, index) => {
    setShopIndex(index);
    if (user_type === "1") {
      setWholesaler(shops[index]);
    } else {
      setRetailer(shops[index]);
    }
    console.log(retailer);
  };

  const setProductReview = (e) => {
    setReview(e.target.value);
  };

  const handlePostReview = () => {
    var data = JSON.stringify({});
    var config = {};
    if (user_type === "1") {
      data = JSON.stringify({
        productId: wholesaler.url,
        stars: rating,
        review: review,
      });
      config = {
        method: "post",
        url: serverUrl + "/reviews/",
        headers: {
          Authorization: "JWT " + token,
          "Content-Type": "application/json",
        },
        data: data,
      };
    } else {
      data = JSON.stringify({
        retailProductId: retailer.url,
        stars: rating,
        review: review,
      });
      config = {
        method: "post",
        url: serverUrl + "/retail_reviews/",
        headers: {
          Authorization: "JWT " + token,
          "Content-Type": "application/json",
        },
        data: data,
      };
    }
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getReviews = () => {
    var config = {};
    if (user_type === "1") {
      config = {
        method: "get",
        url: serverUrl + "/reviews/?p=" + productName,
        headers: {
          Authorization: "JWT " + token,
        },
      };
    } else {
      config = {
        method: "get",
        url: serverUrl + "/retail_reviews/?p=" + productName,
        headers: {
          Authorization: "JWT " + token,
        },
      };
    }

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        const len = response.data.length;
        var new_reviews = [];
        for (var i = 0; i < len; i++) {
          var temp = [...new_reviews];
          temp = [...temp, { review: response.data[i] }];
          new_reviews = temp;
        }
        setReviews(new_reviews);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    try {
      setShops(props.shops);
      getReviews();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={classes.root}>
      {console.log(rating)}
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.rvwCont}
      >
        <Grid item className={classes.reviewHead}>
          <Grid container direction="column" alignItems="flex-start">
            <Typography variant="h6">Customer Reviews</Typography>
            <Divider className={classes.divider}></Divider>
          </Grid>
        </Grid>
        <Paper elevation={3} className={classes.customerRvwPaper}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            className={classes.reviewContainer}
          >
            <div style={{ width: "100%" }}>
              <Box display="flex" mt={2} alignItems="center">
                <Box className={classes.new_accountCircleBox}>
                  <AccountCircle></AccountCircle>
                </Box>
                <Box flexGrow={1} className={classes.new_userNameBox}>
                  <Typography className={classes.new_userNameText} align="left">
                    {name}
                  </Typography>
                </Box>
                {user_type === "1" ? (
                  <Grid container item xs={6}>
                    <TextField
                      id="wholesaler"
                      fullWidth
                      select
                      label="Select Wholesaler"
                      // onClick={() => setShops(props.shops)}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                      }}
                      variant="outlined"
                    >
                      {shops &&
                        shops.length > 0 &&
                        shops.map((option, index) => {
                          return (
                            <MenuItem
                              key={option.id}
                              value={option.shopName}
                              selected={index === shopIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option.shopName}
                            </MenuItem>
                          );
                        })}
                    </TextField>
                  </Grid>
                ) : (
                  <Grid container item xs={6}>
                    <TextField
                      id="retailer"
                      fullWidth
                      select
                      label="Select Retailer"
                      onClick={() => setShops(props.shops)}
                      InputLabelProps={{
                        className: classes.floatingLabelFocusStyle,
                      }}
                      variant="outlined"
                    >
                      {shops.length > 0
                        ? shops.map((option, index) => {
                            return (
                              <MenuItem
                                key={option.id}
                                value={option.shopName}
                                selected={index === shopIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {option.shopName}
                              </MenuItem>
                            );
                          })
                        : null}
                    </TextField>
                  </Grid>
                )}
                <Box className={classes.new_postButtonBox}>
                  <Grid container direction="row-reverse">
                    <Button variant="outlined" onClick={handlePostReview}>
                      POST{" "}
                    </Button>
                  </Grid>
                </Box>
              </Box>
              <Box display="flex" mt={2} alignItems="center">
                <Rating
                  name="simple-controlled"
                  value={rating}
                  className={classes.rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
              </Box>
            </div>
            <Box width="100%" className={classes.new_textfieldContainer}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="add_review"
                label="Write something (optional)"
                type="text"
                onChange={setProductReview}
                InputLabelProps={{
                  className: classes.floatingLabelFocusStyle,
                }}
                inputProps={{
                  className: classes.writeReviewInput,
                }}
              />
            </Box>
          </Grid>
        </Paper>

        {reviews.map((rev) => (
          <Paper elevation={1} className={classes.customerRvwPaper}>
            <Grid
              container
              direction="column"
              alignItems="flex-start"
              width="100%"
            >
              <Grid container direction="row" width="100%" alignItems="center">
                <AccountCircle></AccountCircle>
                <Grid item>
                  <Typography className={classes.customerName} noWrap>
                    {rev.review.name}
                  </Typography>
                </Grid>
                <Rating value={rev.review.stars} readOnly />
              </Grid>
              <Typography className={classes.reviewText} align="left">
                {rev.review.review}
              </Typography>
            </Grid>
          </Paper>
        ))}
      </Grid>
    </div>
  );
};

export default Reviews;
