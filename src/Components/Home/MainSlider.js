import { makeStyles } from "@material-ui/core";
import Imgix from "react-imgix";
import theme from "../../theme";
import Slider from 'infinite-react-carousel'
import UseWindowDimensions from "../../utils/UseWindowDimensions";


const useStyles=makeStyles({
    root:{
        padding:theme.spacing(2,4,2),
        // backgroundColor:theme.palette.background.paper
    },
    image:{
        height:(props)=> props?'20vh':'40vh',
    },
    featureContainer:{
        paddingLeft:theme.spacing(5),
        paddingRight:theme.spacing(5),
        marginTop:theme.spacing(5)
    },
    featureItem:{
        padding:theme.spacing(0,4,0)
    }
})

const MainSlider = (props) =>{
    const images=props.images
    const settings =  {
        arrows:false,
        autoplay: true,
        dots: true
    };
    const {width, height, screen} = UseWindowDimensions();
    // console.log(width,height,screen);
    const mobile= screen==='xs'
    const classes=useStyles(mobile)
    return (
        <div className={classes.root}>
          <Slider { ...settings }>
              {images.map((image)=>(
                 <div className={classes.image} >
                     <Imgix 
                          // sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
                          src={image}
                          imgixParams={{
                              fit: "crop",
                              fm: "jpg"
                          }}
                          height='100%'
                          width='100%'/>
                 </div> 
              ))}
          </Slider>
        </div>
    )

}

export default MainSlider;