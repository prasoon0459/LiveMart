import {
  Box,
  CardActionArea,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import theme from "../../theme";
import ReactRoundedImage from "react-rounded-image";
import UseWindowDimensions from "../../utils/UseWindowDimensions";
import fruits from "../../img/fruits.jpg";
import axios from "axios";
import serverUrl from "../../serverURL";
import { useHistory } from "react-router-dom";
import React from "react";

const useStyles = makeStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: (props) =>
      props.mobile ? theme.spacing(1, 1, 1) : theme.spacing(3, 3, 3),
  },
  itemsContainer: {
    padding: (props) =>
      props.sm || props.mobile
        ? theme.spacing(0, 0, 0)
        : theme.spacing(0, 8, 0),
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
  },
  categoryName: {
    margin: (props) =>
      props.mobile ? theme.spacing(1, 1, 1) : theme.spacing(1, 1, 1),
  },
});

const CategoryComp = () => {
  const screen = UseWindowDimensions().screen;
  const mobile = screen === "xs";
  const sm = screen === "sm";
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [categories, setCategories] = React.useState([]);
  const classes = useStyles({ mobile: mobile, sm: sm });

  const getCategories = () => {
    var config = {
      method: "get",
      url: serverUrl + "/category/",
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        setCategories(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleClick = (name) => {
    history.push("/search?c=" + name);
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
          SHOP BY TOP CATEGORIES
        </Typography>
        <Grid container className={classes.itemsContainer}>
          {categories.slice(0, 8).map((category) => (
            <Grid item key={category.id} xs={6} sm={4} md={3} xl={6}>
              <CardActionArea onClick={() => handleClick(category.name)}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.categoryItem}
                >
                  <Grid item>
                    <ReactRoundedImage
                      image={category.image}
                      imageWidth="160"
                      imageHeight="160"
                      roundedColor={theme.palette.primary.main}
                      hoverColor={theme.palette.secondary.main}
                      roundedSize={5}
                    ></ReactRoundedImage>
                  </Grid>
                  <Grid item>
                    <Box className={classes.categoryName}>
                      <Typography variant={mobile ? "subtitle1" : "h6"}>
                        {category.name}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryComp;
