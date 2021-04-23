import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import theme from "../../theme";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import amul from "../../img/amul.jpg";
import Imgix from "react-imgix";
import axios from "axios";
import serverUrl from "../../serverURL";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(1, 0, 1),
    padding: (props) =>
      props.mobile ? theme.spacing(1, 1, 1) : theme.spacing(3, 3, 3),
  },
  itemsContainer: {
    padding: (props) =>
      props.sm || props.mobile
        ? theme.spacing(0, 0, 0)
        : theme.spacing(0, 8, 0),
  },
  brandImage_cover: {
    padding: theme.spacing(1, 1, 1),
    "&:hover": {
      transform: `scale(1.1)`,
      transition: "200ms linear",
    },
  },
  title: {
    fontWeight: 800,
    margin: (props) =>
      props.mobile ? theme.spacing(2, 0, 2) : theme.spacing(2, 0, 3),
    padding: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 1),
  },
  categoryItem: {
    padding: (props) =>
      props.mobile ? theme.spacing(1, 1, 1) : theme.spacing(1, 1, 1),
    margin: (props) =>
      props.mobile ? theme.spacing(0, 0, 0) : theme.spacing(1, 0, 2),
  },
  categoryName: {
    margin: (props) =>
      props.mobile ? theme.spacing(1, 1, 1) : theme.spacing(1, 1, 1),
  },
});

const TopBrand = (props) => {
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [brands, setBrands] = React.useState([]);
  const classes = useStyles({ mobile: mobile, sm: sm });

  const getCategories = () => {
    var config = {
      method: "get",
      url: serverUrl + "/brands/",
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setBrands(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClick = (name) => {
    history.push("/search?b=" + name);
  };
  React.useEffect(() => {
    try {
      getCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Grid container direction="column" className={classes.root}>
        <Typography
          variant={mobile ? "h6" : "h5"}
          align="center"
          className={classes.title}
        >
          SHOP BY TOP BRANDS
        </Typography>
        <Grid container className={classes.itemsContainer}>
          {brands.slice(0, 8).map((brand) => (
            <Grid item key={brand.id} xs={6} sm={4} md={3} xl={2}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.categoryItem}
              >
                <Box
                  border={mobile ? 0 : 1}
                  className={classes.brandImage_cover}
                  onClick={() => handleClick(brand.name)}
                >
                  <Grid item xs={12}>
                    <Imgix
                      src={amul}
                      width="150"
                      height="150"
                      imgixParams={{
                        fit: "fit",
                        fm: "jpg",
                      }}
                    ></Imgix>
                    <Grid item>
                      <Typography variant={mobile ? "subtitle1" : "h6"}>
                        {brand.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TopBrand;
