import {
  makeStyles,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  FormGroup,
  Button,
} from "@material-ui/core";
import theme from "../../theme";
import React from "react";
import { Check } from "@material-ui/icons";
import axios from "axios";
import serverUrl from "../../serverURL";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // backgroundColor:'violet',
    padding: theme.spacing(1, 2, 1),
  },
  label: {
    textAlign: 'left'
  },
  title: {
    letterSpacing: 2
  },
  filterTypeContainer: {
    margin: theme.spacing(1, 3, 2),
    width: "100%",
    alignItems: 'flex-start'
  },
  formControlLabel: {
    width: "100%",
  },
  flexGrow:{
    flexGrow:1
  },
  filterHeadRow:{
    margin:theme.spacing(0,0,2)
  },
  filterTitle: {
    margin: theme.spacing(2, 1, 0),
    fontWeight: '800',

  },
  filter: {
    margin: theme.spacing(1, 1, 1),
    width: '100%',
  },
  checkbox: {
  },
  mainContainer: {
    margin: theme.spacing(0, 2, 0),
    backgroundColor: theme.palette.action.disabled,
    width: "100%",
  },
  slider: {
    width: '60%',
    margin: theme.spacing(0, 2, 1)
  }
});

const Filter = ({ changeFilter, filters, handleCloseFilter }) => {
  const classes = useStyles();
  const [token,setToken]=React.useState(localStorage.getItem('token'))
  const [filter_price, setFilter_price] = React.useState(null);
  const [filter_categories, setFilter_categories] = React.useState(null);
  const [filter_discounts, setFilter_discount] = React.useState(null);
  const [filter_brands, setFilter_Brand] = React.useState(null);

  const [categories, setCategories] =React.useState([])
  const [brands, setBrands] = React.useState([]);
  const [discounts,]=React.useState([
    "0-20%",
    "20-40%",
    "40-60%",
    "60-80%",
    "80-100%",
  ])
  const [price_marks,] = React.useState([
    {
      value: 0,
      label: 'Rs.0',
    },
    {
      value: 4999,
      label: 'Rs.4999',
    },
  ])

  React.useEffect(() => {
    try{
      getCategories()
      getBrands()
    }
    catch(e){
      console.log(e)
    }  
    
    console.log(filters)
    setFilter_price(filters.price)
    setFilter_Brand(filters.brands)
    setFilter_categories(filters.categories)
    setFilter_discount(filters.discounts)
  }, [])

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
        console.log(JSON.stringify(response.data));
        var cat = []
        for(var i=0;i<response.data.length;i++){
          cat.push(response.data[i].name)
        }
        setCategories(cat);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getBrands = () => {
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
        var bra = []
        for(var i=0;i<response.data.length;i++){
          bra.push(response.data[i].name)
        }
        setBrands(bra);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlePriceSliderChange = (event, newPriceRange) => {
    setFilter_price(newPriceRange);
    console.log(filter_price)
  };
  const handleDiscountFilterChange = (event) => {
    if (!filter_discounts.includes(event.target.value))
      setFilter_discount(filter_discounts.concat(event.target.value))
    else
      setFilter_discount(filter_discounts.filter((discount) => discount !== event.target.value))
    console.log(filter_discounts)
  };
  const handleBrandFilterChange = (event) => {
    if (!filter_brands.includes(event.target.value))
      setFilter_Brand(filter_brands.concat(event.target.value))
    else
      setFilter_Brand(filter_brands.filter((brand) => brand !== event.target.value))
    console.log(filter_brands)
  };
  const handleCategoryFilterChange = (event) => {
    if (!filter_categories.includes(event.target.value))
      setFilter_categories(filter_categories.concat(event.target.value))
    else
      setFilter_categories(filter_categories.filter((category) => category !== event.target.value))
    console.log(filter_categories)
  };


  const handleApplyClick= () =>{
    changeFilter('categories',filter_categories)
    changeFilter('brands', filter_brands)
    changeFilter('discounts', filter_discounts)
    changeFilter('price', filter_price)
    handleCloseFilter()
  }

  return (
    <div className={classes.root}>
      <Grid container direction="column" >
        <Grid container direction='row' alignItems='center' className={classes.filterHeadRow} >
          <Grid item className={classes.flexGrow}>
              <Typography  align="left" variant="h6" className={classes.title}>
                  FILTERS
              </Typography>
          </Grid>
          <Grid item>
              <Button variant='outlined' color='secondary' onClick={handleApplyClick} endIcon={<Check></Check>}>Apply</Button>
          </Grid>
        </Grid>
        <Divider ></Divider>
        <Grid
          container
          // className={classes.mainContainer}
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Grid container direction="column" justify="center" alignItems="flex-start">
              <Grid>
                <Typography variant='subtitle1' className={classes.filterTitle}>By Categories</Typography>
              </Grid>

              <Grid >
                <FormGroup className={classes.filterTypeContainer} >
                  {categories.map((category) => (
                    <Grid >
                      <FormControlLabel
                        value={category}
                        onChange={handleCategoryFilterChange}
                        control={
                          <Checkbox name={category} checked={filter_categories!==null&&filter_categories.includes(category)} className={classes.checkbox} />
                        }
                        classes={{ label: classes.label }}
                        label={category}
                      />
                    </Grid>
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider></Divider>
        <Grid
          container
          // className={classes.mainContainer}
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          <Grid container xs={12} direction="column" justify="center" alignItems="flex-start" >
            <Typography variant='subtitle1' className={classes.filterTitle}>By Price</Typography>
            <Grid container className={classes.filterTypeContainer}>
              <Slider value={filter_price}
                className={classes.slider}
                onChange={handlePriceSliderChange}
                valueLabelDisplay="auto"
                min={0}
                max={4999}
                step={100}
                marks={price_marks}
                aria-labelledby="Price">
              </Slider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider></Divider>
      <Grid
        container
        // className={classes.mainContainer}
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Grid container direction="column" justify="center" alignItems="flex-start">
            <Grid>
              <Typography variant='subtitle1' className={classes.filterTitle}>By Brands</Typography>
            </Grid>
            <Grid >
              <FormGroup className={classes.filterTypeContainer} >
                {brands.map((brand) => (
                  <Grid >
                    <FormControlLabel
                      value={brand}
                      onChange={handleBrandFilterChange}
                      control={
                        <Checkbox name={brand} checked={filter_brands!==null&&filter_brands.includes(brand)} className={classes.checkbox} />
                      }
                      label={brand}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider></Divider>
      <Grid
        container
        // className={classes.mainContainer}
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item xs={12}>
          <Grid container direction="column" justify="center" alignItems="flex-start">
            <Grid>
              <Typography variant='subtitle1' className={classes.filterTitle}>By Discounts</Typography>
            </Grid>
            <Grid >
              <FormGroup className={classes.filterTypeContainer} >
                {discounts.map((discount) => (
                  <Grid >
                    <FormControlLabel
                      value={discount}
                      onChange={handleDiscountFilterChange}
                      control={
                        <Checkbox name={discount} checked={filter_discounts!==null&&filter_discounts.includes(discount)} className={classes.checkbox} />
                      }
                      label={discount}
                    />
                  </Grid>
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider></Divider>
    </div>

  );
};

export default Filter;
