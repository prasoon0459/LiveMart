import {
  ArrowBackIos,
  ArrowDropDown,
  ArrowForwardIos,
  Check,
  ChevronRight,
  Clear,
  ClearSharp,
  CloseRounded,
  Filter1,
  FilterList,
} from "@material-ui/icons";
import Imgix from "react-imgix";
import Item from "../../Data/Item";
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
  AppBar,
  Toolbar,
  ListItem,
  ListItemText,
  List,
  Slide,
  Fab,
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
    const screen = UseWindowDimensions().screen
    // const search_query = new URLSearchParams(location.search);
    const search_query = (location.search).toString().substr(3);
    console.log(search_query);
    const params = new URLSearchParams(location.search);
    const category = params.get('c');
    var product = params.get('q');
    if (product===null) {
        product = '';
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
  // const [data, setData] = React.useState([]);
  //const items = [];

  const [filters, setFilters] = React.useState({
    categories: [],
    brands: [],
    discounts: [],
    price: [0, 4999],
  });

  const handleSearch = () => {
    var config = {
      method: "get",
      url:
        serverUrl +
        "/default_products/" +
        (category !== null ? "?c=" + category : ""), // +(product!==null ? '?q='+product : '')
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
  };

  const handleFilterRemoved = (type, filterRemoved) => {
    var newFilters = filters;
    newFilters[type] = filters[type].filter(
      (filter) => filter !== filterRemoved
    );
    setFilters(newFilters);
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
                  Home / Products / Milk
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" className={classes.searchTitle}>
                  Milk
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

    return (
        <div className={classes.root}>
            <div className={classes.heroContent}>
                <Grid container direction='row' className={classes.heroContainer} alignItems='center'>
                    <Grid item className={classes.flexGrow}>
                        <Grid container  direction="column" justify="center" alignItems="flex-start">
                            <Grid item>
                                <Typography variant="subtitle1" className={classes.searchNavigation}>
                                    Home / Products / {search_query}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" className={classes.searchTitle}>
                                    {search_query}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    {!filtershown?<Grid item>
                        <Button variant='outlined' onClick={handleOpenFilter} endIcon={<FilterList/>}>Filters</Button>
                    </Grid>:<div></div>}
                </Grid>
            </div>
            {!filtershown&&
                <div className={classes.activeFiltersContainer}>
                    <Grid container direction='row'>
                        {filters.categories.map((filter)=>(
                            <Grid item className={classes.indFilterBtn}>
                                <Button  className={classes.fab} variant='outlined' size='small'  color='secondary'>
                                    <Typography className={classes.buttonText}>{filter}</Typography>
                                </Button>
                            </Grid>
                        ))}
                        {filters.brands.map((filter)=>(
                            <Grid item className={classes.indFilterBtn}>
                                <Button  className={classes.fab} variant='outlined' size='small'  color='secondary'>
                                    <Typography className={classes.buttonText}>{filter}</Typography>
                                </Button>
                            </Grid>
                        ))}
                        {filters.discounts.map((filter)=>(
                            <Grid item className={classes.indFilterBtn}>
                                <Button  className={classes.fab} variant='outlined' size='small'  color='secondary'>
                                    <Typography className={classes.buttonText}>{filter+' Off'}</Typography>
                                </Button>
                            </Grid>
                        ))}
                        {(filters.price[0]!==0||filters.price[1]!==4999)&&
                           <Grid item className={classes.indFilterBtn}>
                                <Button  className={classes.fab} variant='outlined' size='small'  color='secondary'>
                                    <Typography className={classes.buttonText}>{'Rs.'+filters.price[0]+' - Rs.'+filters.price[1]}</Typography>
                                </Button>
                            </Grid> 
                        }
                    </Grid>
                </div>
            }
            <Dialog fullScreen open={filterOpen} onClose={handleCloseFilter} TransitionComponent={Transition}>
                <Filter changeFilter={handleFilterChange} filters={filters} handleCloseFilter={handleCloseFilter}></Filter>
            </Dialog>
            <Grid container>
                {filtershown ?
                    <Grid item xs={3}>
                        <Filter changeFilter={handleFilterChange} filters={filters} handleCloseFilter={handleCloseFilter}></Filter>
                    </Grid> : <div></div>}
                <Grid item xs={filtershown ? 9 : 12}>
                    <Paper className={classes.paper}>
                        <Box
                            display="flex"
                            flexDirection="row-reverse"
                            p={1}
                            className={classes.topBox}
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
