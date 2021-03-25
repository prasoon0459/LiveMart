import {
    Box,
    Grid,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import theme from "../../theme";
  import UseWindowDimensions from '../../utils/UseWindowDimensions'
  import amul from '../../img/amul.jpg';
import Imgix from "react-imgix";

  const useStyles = makeStyles({
    root: {
      backgroundColor:theme.palette.background.paper,
      margin: theme.spacing(1, 0, 1),
      padding: (props) => props.mobile ?theme.spacing(1, 1, 1): theme.spacing(3,3,3),
    },
    itemsContainer:{
      padding:(props)=>props.sm||props.mobile?theme.spacing(0,0,0): theme.spacing(0,8,0),
    },
    brandImage_cover:{
        padding: theme.spacing(1, 1, 1),
        '&:hover':{
          transform: `scale(1.1)`,
          transition: '200ms linear'
        }
    },
    title:{
        fontWeight:800,
        margin:(props) => props.mobile ?theme.spacing(2,0,2): theme.spacing(2,0,3),
        padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
    },
    categoryItem:{
        padding: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
        margin: (props) => props.mobile ?theme.spacing(0,0,0): theme.spacing(1,0,2),
    },
    categoryName:{
        margin: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
    }
  });
  
  const TopBrand = (props) => {
    
    const {width, height, screen} = UseWindowDimensions();
    const mobile= screen==='xs'
    const sm= screen==='sm'
    const categories= props.categories
    const classes= useStyles({mobile:mobile, sm:sm} );
    return (
      <div>
        <Grid container direction="column" className={classes.root}>
          <Typography variant={mobile?'h6':'h5'} align="center" className={classes.title}>
            SHOP BY TOP BRANDS
          </Typography>
          <Grid container  className={classes.itemsContainer}>
                {categories.map((card) => (
                <Grid item key={card} xs={6} sm={4} md={3} xl={2}>
                        <Grid container direction='column' justify='center' alignItems='center' className={classes.categoryItem}>
                            <Box border={mobile?0:1} className={classes.brandImage_cover}>
                                <Grid item xs={12}>
                                    <Imgix
                                        src={amul}
                                        width='180'
                                        height='150'
                                        imgixParams={{
                                            fit: "fit",
                                            fm: "jpg",
                                        }}
                                    >
                                    </Imgix>
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
  