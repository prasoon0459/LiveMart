import { Badge, Button, Card, CardActions, CardContent,  Grid, makeStyles, Typography } from "@material-ui/core";
import Imgix from "react-imgix";
import theme from "../../theme";
import Slider from "infinite-react-carousel"
import UseWindowDimensions from "../utils/UseWindowDimensions";


const useStyles=makeStyles({
    
    featureContainer:{
        paddingLeft:theme.spacing(5),
        paddingRight:theme.spacing(5),
        marginTop:theme.spacing(5)
    },
    featureItem:{
        padding:theme.spacing(0,4,0)
    },
    item:{ 
        paddingLeft:"10px",
        paddingRight:"10px"
    },
    slider:{
        margin:'10px'
    },
    card: {
        padding: theme.spacing(3,2,3),
        margin:'10px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
})

const ItemSlider = (props) =>{
    const items=props.items
    var settings=props.settings

    const {height, width}= UseWindowDimensions()
    settings.slidesToShow=width/400;
    
    const classes=useStyles()
    return (
        <div >
          <Slider { ...settings } className={classes.slider}>
              {items.map((item)=>(
                    <Grid item key={item} className={classes.item} >
                    <Card variant="outlined" className={classes.card}>
                    <Badge badgeContent='40%' color='secondary' > 
                        <Grid container justify='center'>
                            <Imgix
                                src='https://www.bigbasket.com/media/uploads/p/l/40208851_1-too-yumm-potato-stix-aloo-chat.jpg'
                                width="200px"
                                height="200px"
                                imgixParams={{
                                    fit: "fit",
                                    fm: "jpg"
                                }}
                            />
                            <CardContent className={classes.cardContent}>
                                <Grid container direction='row' justify='flex-start'>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom variant="h6" component="h2" align='left'>
                                        Too Yum
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                                            Rs. 128 
                                        </Typography>
                                        <Typography>
                                            Rs. 108 
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions width="100%" className={classes.cardContent}>
                                <Button fullWidth
                                    variant="outlined"
                                    color="primary">
                                Add to Cart
                                </Button>
                            </CardActions>
                        </Grid>
                        </Badge>
                        </Card>
                    </Grid>
              ))}
          </Slider>
        </div>
    )

}

export default ItemSlider;