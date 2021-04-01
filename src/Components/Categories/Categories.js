import {
    Box,
    CardActionArea,
    Divider,
    Grid,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import theme from "../../theme";
  import ReactRoundedImage from 'react-rounded-image'
  import UseWindowDimensions from '../../utils/UseWindowDimensions'
  import fruits from '../../img/personalCare.png'

const useStyles = makeStyles({
    root: {
        padding: (props) => props.mobile ?theme.spacing(0, 0, 0): theme.spacing(3,8,3),
      },
      itemsContainer:{
        padding:(props)=>props.sm||props.mobile?theme.spacing(2,0,0): theme.spacing(4,5,0),
      },
      title:{
        fontWeight:500,
        letterSpacing:2,
        margin:(props) => props.mobile ?theme.spacing(2,1,2): theme.spacing(2,2,1),
        padding: (props) => props.mobile ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
      },
      categoryItem:{
          padding: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
      },
      categoryName:{
          margin: (props) => props.mobile ?theme.spacing(1,1,1): theme.spacing(1,1,1),
      }

})

const Categories = () =>{
    const categories = [1, 2, 3, 4, 5, 6, 7, 8,3, 4, 5, 6, 7, 8];

    const screen = UseWindowDimensions().screen;
    const mobile= screen==='xs'
    const sm= screen==='sm'

    const classes=useStyles({mobile:mobile, sm:sm});
    console.log(mobile)

    return(
        <div>
            <Grid container direction="column" className={classes.root}>
                <Typography variant={mobile?'h6':'h5'} align="left" className={classes.title}>
                    Categories
                </Typography>
                <Divider></Divider>
                <Grid container className={classes.itemsContainer} >
                    {categories.map((card) => (
                    <Grid item key={card} xs={6} sm={4} md={3} xl={6}>
                        <CardActionArea>
                            <Grid container direction='column' justify='center' alignItems='center' className={classes.categoryItem}>
                                <Grid item>
                                    <ReactRoundedImage
                                        image={fruits}
                                        imageWidth='160'
                                        imageHeight='160'
                                        roundedColor={theme.palette.primary.main}
                                        hoverColor={theme.palette.secondary.main}
                                        roundedSize={5}
                                    >
                                    </ReactRoundedImage>
                                </Grid>
                                <Grid item>
                                    <Box className={classes.categoryName}>
                                        <Typography variant={mobile?'subtitle1':'h6'}>
                                            Personal Care
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
    )
}
export default Categories;