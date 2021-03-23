import {
    Badge,
    Box,
    Card,
    Grid,
    IconButton,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import { AddShoppingCartOutlined } from "@material-ui/icons";
  import { Slider } from "infinite-react-carousel/lib";
  import Imgix from "react-imgix";
  import Item from "../../Data/Item";
  import theme from "../../theme";
  import UseWindowDimensions from '../../utils/UseWindowDimensions'

  const useStyles = makeStyles({
    root: {
      backgroundColor:theme.palette.background.paper,
      margin: theme.spacing(1, 0, 1),
      padding: (props) => props ?theme.spacing(1, 1, 1): theme.spacing(3,3,3),
    },
    title:{
      fontWeight:800,
      margin:(props) => props ?theme.spacing(2,0,2): theme.spacing(0,0,0),
      padding: (props) => props ?theme.spacing(0,0,0):theme.spacing(1, 0, 1) ,
    },
    price:{
        marginLeft: theme.spacing(1),
    },
    itemName:{
        fontWeight: 700,
    },
    item: {
      padding: theme.spacing(0, 1, 0),
    },
    shoppingCartIcon:{
        flexGrow:1
    },
    slider: {
      padding: (props) => props ?theme.spacing(1, 0, 1): theme.spacing(3,1,3),
    },
    itemImage:{
        margin: theme.spacing(1,3,1)
    },
    card: {
      flexDirection: "column",
      padding:theme.spacing(1,1,1)
    },
  });
  
  const MostPurchased = (props) => {
    // const isMobile = useMediaQuery(theme.breakpoints.down('xs'), {
    //     defaultMatches: true
    // });
    const {width, height, screen} = UseWindowDimensions();
    console.log(width,height,screen)
    let a = new Item("Lays and Nachos", "snacks", "", 128, 10);
    const items = [a, a, a, a, a, a, a, a, a, a];
    const mobile= screen==='xs'
    const itemSettings = {
      arrows: true,
      slidesToShow:screen==='xs'?2:screen==='sm'?3:screen==='md'?4:screen==='lg'?5:6,
      arrowsBlock: false,
    };
    const classes = useStyles(mobile);
    return (
      <div>
        <Grid container direction="column" className={classes.root}>
          <Typography variant={mobile?'h6':'h5'} align="left" className={classes.title}>
            Most Purchased today
          </Typography>
          <Slider {...itemSettings} className={classes.slider}>
            {items.map((item) => (
              <Grid item key={item} className={classes.item}>
                <Card variant="outlined" className={classes.card}>
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
                            width='100%'
                            imgixParams={{
                            fit: "fit",
                            fm: "jpg",
                            }}
                        />
                        </Badge>
                      </Box>
                      <Grid container direction='row' >
                        <Box display='flex' width='100%' alignItems='center'>
                            <Box flexGrow={1}>
                                <Grid container direction='column' >
                                    <Typography align='left' variant='subtitle1' className={classes.itemName}>Too Yumm </Typography>
                                    <Typography align='left' variant='body2' className={classes.price}>Rs. 518 </Typography>
                                </Grid>
                            </Box>
                            <Box >
                                <IconButton><AddShoppingCartOutlined  color='secondary'></AddShoppingCartOutlined></IconButton>
                                
                            </Box>
                        </Box>
                      </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Slider>
        </Grid>
      </div>
    );
  };
  
  export default MostPurchased;
  