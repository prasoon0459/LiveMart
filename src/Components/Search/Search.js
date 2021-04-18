import {
    ArrowBackIos,
    ArrowDropDown,
    ArrowForwardIos,
    ChevronRight,
} from "@material-ui/icons";
import Imgix from "react-imgix";
import Item from "../../Data/Item";
import theme from "../../theme";
import { NavLink, useLocation } from 'react-router-dom'
import serverUrl from "../../serverURL";
import axios from "axios";
import React from 'react';


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
        padding: theme.spacing(2, 2, 2)
    },
    card: {
        flexDirection: "column",
        padding: theme.spacing(2, 1, 1)
    },
    itemsContainer: {
        padding: theme.spacing(3, 2, 3)
    },
    itemImage: {
        margin: theme.spacing(1, 3, 1),
        '&:hover': {
            transform: `scale(1.1)`,
            transition: '200ms linear'
        }
    },
    searchNavigation: {
        letterSpacing: 2,
        padding: theme.spacing(1, 2, 1),
        fontSize: 12
    },
    searchTitle: {
        letterSpacing: 2,
        fontWeight: "800",
        padding: theme.spacing(0, 3, 1),
    },
    paper: {
        // backgroundColor:'yellow',
        borderRadius: 10,
        height: "100%",
        padding: theme.spacing(1, 2, 1),
        margin: theme.spacing(1, 1, 1),
    },
    pageNoTitle: {
        margin: theme.spacing(0, 2, 0)
    },
    pageNoBox: {
        margin: theme.spacing(4, 0, 2)
    }
});

const Search = () => {
    const location = useLocation();
    console.log(location.search);
    // const search_query = new URLSearchParams(location.search);
    const search_query = (location.search).toString();
    const classes = useStyles();
    // const history = useHistory();

    const token = localStorage.getItem('token');
    // const username = localStorage.getItem('username');

    // let a = new Item("Lays and Nachos", "snacks", "", 128, 10);
    // const items = [a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a, a];
    const [items, setItems] = React.useState([]);
    const [status, setStatus] = React.useState(false);
    // const [data, setData] = React.useState([]);
    //const items = [];

    const handleSearch = () => {
        var config = {
            method: 'get',
            url: serverUrl+'/products/'+search_query,
            headers: { 
            'Authorization': 'JWT ' + token
            }
        };
        
        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            // setData(response.data);
            const len = (response.data).length
            var new_items = []
            for (var i=0;i<len;i++) {
                var temp = [...new_items];
                temp = [...temp, {item : response.data[i]}];
                new_items = temp;
            }
            setItems(new_items);
            setStatus(true);
        })
        .catch(function (error) {
            console.log(error);
        });
  
    }

    const setProduct = (product) => {
        localStorage.setItem('product', product.item.url);
        localStorage.setItem('productName', product.item.name);
    }

    React.useEffect(() => {
        try {
            handleSearch();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.heroContent}>
                <Grid
                    container
                    xs={3}
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
            </div>
            <Grid container>
                <Grid item xs={3}>
                    <Filter></Filter>
                </Grid>
                <Grid item xs={9}>
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
                        <Grid container spacing={5} justify="flex-start" alignItems="center" className={classes.itemsContainer}>
                            {items.map((product) => (
                                <Grid item xs={3} className={classes.item} style={{ textDecoration: 'none' }} component={NavLink} to='/product'>
                                    <Card variant="outlined" className={classes.card} onClick={setProduct(product)}>
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
                                                        // src = {product.image}
                                                        width="100%"
                                                        imgixParams={{
                                                            fit: "fit",
                                                            fm: "jpg",
                                                        }}
                                                    />
                                                </Badge>
                                            </Box>
                                            <Grid container direction="row">
                                                <Box display="flex" width="100%" alignItems="center">
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
                                                                {product.item.wholesale_price}
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
                        </Grid>) : <div/>}
                        <Grid container xs={12} spacing={2}>
                            <Box display="flex" flexDirection='row-reverse' width="100%" alignItems="center" className={classes.pageNoBox}>
                                <Grid item>
                                    <IconButton><ArrowBackIos></ArrowBackIos></IconButton>
                                    <IconButton><Typography>1</Typography></IconButton>
                                    <IconButton><Typography>2</Typography></IconButton>
                                    <IconButton><Typography>3</Typography></IconButton>
                                    <IconButton><ArrowForwardIos></ArrowForwardIos></IconButton>
                                </Grid>
                                <Typography className={classes.pageNoTitle}>Page No.</Typography>
                            </Box>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Search;
