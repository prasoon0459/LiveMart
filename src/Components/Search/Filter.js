import {
    makeStyles,
    Grid,
    Typography,
    FormControlLabel,
    Checkbox,
    Slider,
    Divider,
    FormGroup,
  } from "@material-ui/core";
  import theme from "../../theme";
  import React from "react";
  
  const useStyles = makeStyles({
    root: {
      flexGrow:1,
      // backgroundColor:'violet',
      padding: theme.spacing(1, 2, 1),
    },
    title:{
      letterSpacing:2
    },
    filterTypeContainer: {
      margin: theme.spacing(1, 3, 2),
      width: "100%",
      alignItems:'flex-start'
    },
    formControlLabel: {
      width: "100%",
    },
    filterTitle:{
      margin: theme.spacing(2,1,0),
      fontWeight:'800',
      
    },
    filter: {
      margin: theme.spacing(1, 1, 1),
      width:'100%',
    },
    checkbox: {
    },
    mainContainer: {
      margin: theme.spacing(0, 2, 0),
      backgroundColor: theme.palette.action.disabled,
      width: "100%",
    },
    slider:{
      width:'60%',
      margin:theme.spacing(0,2,1)
    }
  });
  
  const Filter = () => {
    const classes = useStyles();
  
    const [filter_price, setFilter_price] = React.useState([0, 4999]);
    const [filter_categories, setFilter_categories] = React.useState([]);
    const [filter_discounts, setFilter_discount] = React.useState([]);
    const [filter_brands, setFilter_Brand] = React.useState([]);
  
    const marks = [
      {
        value: 0,
        label: 'Rs.0',
      },
      {
        value: 4999,
        label: 'Rs.4999',
      },
    ];

    const handlePriceSliderChange = (event, newPriceRange) => {
      setFilter_price(newPriceRange);
      console.log(filter_price)
    };
    const handleDiscountFilterChange = (event) => {
      if(!filter_discounts.includes(event.target.value))
        setFilter_discount(filter_discounts.concat(event.target.value))
      else
        setFilter_discount(filter_discounts.filter((discount)=>discount!==event.target.value))
      console.log(filter_discounts)
    };
    const handleBrandFilterChange = (event) => {
      if(!filter_brands.includes(event.target.value)) 
        setFilter_Brand(filter_brands.concat(event.target.value))
      else 
        setFilter_Brand(filter_brands.filter((brand)=>brand!==event.target.value))
      console.log(filter_brands)
    };
    const handleCategoryFilterChange = (event) => {
      if(!filter_categories.includes(event.target.value)) 
        setFilter_categories(filter_categories.concat(event.target.value))
      else 
        setFilter_categories(filter_categories.filter((category)=>category!==event.target.value))
      console.log(filter_categories)
    };

    
  
    const categories = [
      "Personal Care",
      "Bevereges",
      "Cleaning and Household",
      "Bakery and Dairy",
      "Kitchen and Garden",
      "Pets",
    ];
    const brands = [
      "Amul",
      "Nestle",
      "Parag",
      "Mother Dairy",
      "Parle",
      "Kissan",
    ];

    const discounts = [
      "0-20%",
      "20-40%",
      "40-60%",
      "60-80%",
      "80-100%",
    ];

    return (
      <div className={classes.root}>
        <Grid container direction="column" >
        <Typography align="left" variant="h6" className={classes.title}>
          FILTERS
        </Typography>
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
                        {categories.map((category)=>(
                            <Grid >
                                <FormControlLabel
                                    value={category}
                                    onChange={handleCategoryFilterChange}
                                    control={
                                        <Checkbox name={category} className={classes.checkbox} />
                                    }
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
                      marks={marks}
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
                        {brands.map((brand)=>(
                            <Grid >
                                <FormControlLabel
                                    value={brand}
                                    onChange={handleBrandFilterChange}
                                    control={
                                        <Checkbox name={brand} className={classes.checkbox} />
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
                        {discounts.map((discount)=>(
                            <Grid >
                                <FormControlLabel
                                    value={discount}
                                    onChange={handleDiscountFilterChange}
                                    control={
                                        <Checkbox name={discount} className={classes.checkbox} />
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
  