import {
  ArrowBackIos,
  ArrowDropDown,
  ArrowForwardIos,
  ChevronRight,
  FilterList,
} from "@material-ui/icons";
import Imgix from "react-imgix";
import theme from "../../theme";
import { NavLink, useLocation } from "react-router-dom";
import serverUrl from "../../serverURL";
import axios from "axios";
import React from "react";
import UseWindowDimensions from "../../utils/UseWindowDimensions";

const {
  makeStyles,
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  Badge,
  Card,
  Dialog,
  Slide,
} = require("@material-ui/core");
const { default: Filter } = require("./Filter");

const useStyles = makeStyles({
  root: {},

  price: {
    marginLeft: theme.spacing(1),
  },
  itemName: {
    fontWeight: 700,
  },
  item: {
    padding: theme.spacing(2, 2, 2),
  },
  card: {
    flexDirection: "column",
    padding: theme.spacing(2, 1, 1),
  },
  itemsContainer: {
    padding: theme.spacing(3, 2, 3),
  },
  itemImage: {
    margin: theme.spacing(1, 3, 1),
    "&:hover": {
      transform: `scale(1.1)`,
      transition: "200ms linear",
    },
  },
  searchNavigation: {
    letterSpacing: 2,
    padding: theme.spacing(1, 2, 1),
    fontSize: 12,
  },
  searchTitle: {
    letterSpacing: 2,
    fontWeight: "800",
    padding: theme.spacing(0, 3, 1),
  },
  activeFiltersContainer: {
    padding: theme.spacing(0, 2, 0),
  },
  flexGrow: {
    flexGrow: 1,
  },
  paper: {
    // backgroundColor:'yellow',
    borderRadius: 10,
    height: "100%",
    padding: theme.spacing(1, 2, 1),
    margin: theme.spacing(1, 1, 1),
  },
  filterHeadContainer: {
    padding: theme.spacing(2),
  },
  heroContainer: {
    padding: theme.spacing(0, 2, 0),
  },
  pageNoTitle: {
    margin: theme.spacing(0, 2, 0),
  },
  indFilterBtn: {
    margin: theme.spacing(0.5),
  },
  pageNoBox: {
    margin: theme.spacing(4, 0, 2),
  },
  buttonText: {
    fontSize: 12,
  },
  fab: {
    boxShadow: 2,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Search = () => {
  const location = useLocation();
  const screen = UseWindowDimensions().screen;
  // const search_query = new URLSearchParams(location.search);

  const [filters, setFilters] = React.useState({
    categories: [],
    brands: [],
    discounts: [],
    price: [0, 4999],
  });

  const search_query = location.search.toString().substr(3);
  console.log(search_query);
  const params = new URLSearchParams(location.search);
  const category_recvd = params.get("c");
  const brand_recvd = params.get("b");

  var product = params.get("q");
  if (product === null) {
    product = "";
  }

  const classes = useStyles();
  // const history = useHistory();
  const filtershown = screen === "md" || screen === "lg" || screen === "xl";
  const token = localStorage.getItem("token");
  // const username = localStorage.getItem('username');

  // let a = new Item("Lays and Nachos", "snacks", "", 128, 10);
  // const items = [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a];
  const [items, setItems] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [itemsToShow, setItemsToShow] = React.useState([]);

  const handleSearch = () => {
    const newFilters = filters;
    if (category_recvd) newFilters.categories.push(category_recvd);
    if (brand_recvd) newFilters.brands.push(brand_recvd);
    setFilters(newFilters);
    var config = {
      method: "get",
      url:
        serverUrl +
        "/default_products/" +
        (category_recvd !== null ? "?c=" + category_recvd : "") + // +(product!==null ? '?q='+product : '')
        (brand_recvd !== null ? "?b=" + brand_recvd : ""),
      headers: {
        Authorization: "JWT " + token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        // setData(response.data);
        const len = response.data.length;
        var new_items = [];
        for (var i = 0; i < len; i++) {
          var temp = [...new_items];
          temp = [...temp, { item: response.data[i] }];
          new_items = temp;
        }
        setItems(new_items);
        setItemsToShow(new_items);
        setStatus(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setProduct = (product) => {
    localStorage.setItem("product", product.item.url);
    localStorage.setItem("productName", product.item.name);
  };

  const handleFilterChange = (type, filter) => {
    var newFilters = filters;
    newFilters[type] = filter;
    setFilters(newFilters);

    console.log(filters);
    console.log(items);

    var newItemsToShow =
      filters.categories.length !== 0
        ? items.filter((val) =>
            filters.categories.includes(val.item.category.name)
          )
        : items;
    console.log(newItemsToShow);
    newItemsToShow =
      filters.brands.length !== 0
        ? newItemsToShow.filter((val) =>
            filters.brands.includes(val.item.brand.name)
          )
        : newItemsToShow;
    console.log(newItemsToShow);
    setItemsToShow(newItemsToShow);
  };

  const [filterOpen, setFilterOpen] = React.useState(false);
  const handleOpenFilter = () => {
    if (filtershown) setFilterOpen(false);
    else setFilterOpen(true);
  };
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };

  React.useEffect(() => {
    try {
      handleSearch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.heroContent}>
        <Grid
          container
          direction="row"
          className={classes.heroContainer}
          alignItems="center"
        >
          <Grid item className={classes.flexGrow}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography
                  variant="subtitle1"
                  className={classes.searchNavigation}
                >
                  Home / Products / {product}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.searchTitle}>
                  {product}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {!filtershown ? (
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleOpenFilter}
                endIcon={<FilterList />}
              >
                Filters
              </Button>
            </Grid>
          ) : (
            <div></div>
          )}
        </Grid>
      </div>
      {!filtershown && (
        <div className={classes.activeFiltersContainer}>
          <Grid container direction="row">
            {filters.categories.map((filter) => (
              <Grid item className={classes.indFilterBtn}>
                <Button
                  className={classes.fab}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  <Typography className={classes.buttonText}>
                    {filter}
                  </Typography>
                </Button>
              </Grid>
            ))}
            {filters.brands.map((filter) => (
              <Grid item className={classes.indFilterBtn}>
                <Button
                  className={classes.fab}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  <Typography className={classes.buttonText}>
                    {filter}
                  </Typography>
                </Button>
              </Grid>
            ))}
            {filters.discounts.map((filter) => (
              <Grid item className={classes.indFilterBtn}>
                <Button
                  className={classes.fab}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  <Typography className={classes.buttonText}>
                    {filter + " Off"}
                  </Typography>
                </Button>
              </Grid>
            ))}
            {(filters.price[0] !== 0 || filters.price[1] !== 4999) && (
              <Grid item className={classes.indFilterBtn}>
                <Button
                  className={classes.fab}
                  variant="outlined"
                  size="small"
                  color="secondary"
                >
                  <Typography className={classes.buttonText}>
                    {"Rs." + filters.price[0] + " - Rs." + filters.price[1]}
                  </Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </div>
      )}
      <Dialog
        fullScreen
        open={filterOpen}
        onClose={handleCloseFilter}
        TransitionComponent={Transition}
      >
        <Filter
          changeFilter={handleFilterChange}
          filters={filters}
          handleCloseFilter={handleCloseFilter}
        ></Filter>
      </Dialog>
      <Grid container>
        {filtershown ? (
          <Grid item xs={3}>
            <Filter
              changeFilter={handleFilterChange}
              filters={filters}
              handleCloseFilter={handleCloseFilter}
            ></Filter>
          </Grid>
        ) : (
          <div></div>
        )}
        <Grid item xs={filtershown ? 9 : 12}>
          <Paper className={classes.paper}>
            <Box
              display="flex"
              flexDirection="row-reverse"
              p={1}
              className={classes.topBox}
            >
              <Button>
                <Typography>Sort By</Typography>
                <ArrowDropDown></ArrowDropDown>
              </Button>
            </Box>

            <Divider></Divider>
            {status ? (
              <Grid
                container
                spacing={5}
                justify="flex-start"
                alignItems="center"
                className={classes.itemsContainer}
              >
                {itemsToShow
                  .filter((val) =>
                    val.item.name.toLowerCase().includes(product.toLowerCase())
                  )
                  .map((product) => (
                    <Grid
                      item
                      xs={3}
                      className={classes.item}
                      style={{ textDecoration: "none" }}
                      component={NavLink}
                      to="/product"
                    >
                      {" "}
                      {/* to={{pathname:'/product',aboutProps:{url:'asd',name:product.item.name}}} */}
                      <Card
                        variant="outlined"
                        className={classes.card}
                        onClick={() => setProduct(product)}
                      >
                        <Grid
                          container
                          justify="center"
                          direction="column"
                          alignItems="center"
                        >
                          <Box className={classes.itemImage}>
                            <Badge
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                              overlap="rectangle"
                              badgeContent="40%"
                              color="secondary"
                            >
                              <Imgix
                                src="https://images-na.ssl-images-amazon.com/images/I/716AgMpTqhL._SL1400_.jpg"
                                // src = {product.item.image}
                                width="100%"
                                imgixParams={{
                                  fit: "fit",
                                  fm: "jpg",
                                }}
                              />
                            </Badge>
                          </Box>
                          <Grid container direction="row">
                            <Box
                              display="flex"
                              width="100%"
                              alignItems="center"
                            >
                              <Box flexGrow={1}>
                                <Grid container direction="column">
                                  <Typography
                                    align="left"
                                    variant="subtitle1"
                                    className={classes.itemName}
                                  >
                                    {/* Too Yumm{" "} */}
                                    {product.item.name}
                                  </Typography>
                                  <Typography
                                    align="left"
                                    variant="body2"
                                    className={classes.price}
                                  >
                                    {/* Rs. 518{" "} */}
                                    {/* {product.item.wholesale_price} */}
                                  </Typography>
                                </Grid>
                              </Box>
                              <Box>
                                <IconButton>
                                  <ChevronRight color="secondary" />
                                </IconButton>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <div />
            )}
            <Grid container xs={12} spacing={2}>
              <Box
                display="flex"
                flexDirection="row-reverse"
                width="100%"
                alignItems="center"
                className={classes.pageNoBox}
              >
                <Grid item>
                  <IconButton>
                    <ArrowBackIos></ArrowBackIos>
                  </IconButton>
                  <IconButton>
                    <Typography>1</Typography>
                  </IconButton>
                  <IconButton>
                    <Typography>2</Typography>
                  </IconButton>
                  <IconButton>
                    <Typography>3</Typography>
                  </IconButton>
                  <IconButton>
                    <ArrowForwardIos></ArrowForwardIos>
                  </IconButton>
                </Grid>
                <Typography className={classes.pageNoTitle}>
                  Page No.
                </Typography>
              </Box>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Search;
