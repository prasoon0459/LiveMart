import { makeStyles } from "@material-ui/core";
import Imgix from "react-imgix";
import theme from "../../theme";
import Slider from 'infinite-react-carousel'


const useStyles=makeStyles({
    root:{
        marginTop:'20px'
    },
    image:{
        width:'100vw',
        height:'40vh',
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
        centerMode: true,
        centerPadding: 30,
        dots: true,
        initialSlide: true,
        //   wheel: true
    };
    const classes=useStyles()
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
                          width='80%'/>
                 </div> 
              ))}
          </Slider>
        </div>
    )

}

export default MainSlider;