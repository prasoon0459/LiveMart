import {
    Box,
    CardActionArea,
    Grid,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import theme from "../../theme";
  import ReactRoundedImage from 'react-rounded-image'
  import UseWindowDimensions from '../../utils/UseWindowDimensions'
  import fruits from '../../img/fruits.jpg'

  const useStyles = makeStyles({
    root: {
      backgroundColor:theme.palette.background.paper,
      padding: (props) => props.mobile ?theme.spacing(1, 1, 1): theme.spacing(3,3,3),
    },
    itemsContainer:{
      padding:(props)=>props.sm||props.mobile?theme.spacing(0,0,0): theme.spacing(0,8,0),
    },
    title:{
      fontWeight:800,
      margin:(props) => props.mobile ?theme.spacing(2,0,2): theme.spacing(2,0,3),
      padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
    },
    categoryItem:{
        padding: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
    },
    categoryName:{
        margin: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
    }
  });
  
  const MostPurchased = (props) => {
    
    const {width, height, screen} = UseWindowDimensions();
    console.log(width,height,screen)
    const mobile= screen==='xs'
    const sm= screen==='sm'
    const categories= props.categories
    const classes= useStyles({mobile:mobile, sm:sm} );
    return (
      <div>
        <Grid container direction="column" className={classes.root}>
          <Typography variant={mobile?'h6':'h5'} align="center" className={classes.title}>
            SHOP BY TOP CATEGORIES
          </Typography>
          <Grid container className={classes.itemsContainer} >
                {categories.map((card) => (
                <Grid item key={card} xs={6} sm={4} md={3} xl={6}>
                    <CardActionArea>
                        <Grid container direction='column' justify='center' alignItems='center' className={classes.categoryItem}>
                            <Grid item>
                                <ReactRoundedImage
                                    image={fruits}
                                    imageWidth='180'
                                    imageHeight='180'
                                    roundedColor={theme.palette.primary.main}
                                    hoverColor={theme.palette.secondary.main}
                                    roundedSize={5}
                                >
                                </ReactRoundedImage>
                            </Grid>
                            <Grid item>
                                <Box className={classes.categoryName}>
                                    <Typography variant={mobile?'subtitle1':'h6'}>
                                        Fruits
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
  
  export default MostPurchased;
  