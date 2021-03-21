import { Grid, Typography } from "@material-ui/core"
import Imgix from "react-imgix"
import theme from "../../theme"
import React from 'react';


const FeatureItem= (props) => {

    return(
        <div>
            <Grid container  alignItems="center" justify = "flex-start">
                <Grid item xs={4}  >
                    <Imgix
                        margin={theme.spacing(0,3,0)}
                        src={props.img}
                        imgixParams={{
                            fit: "fit",
                            fm: "svg"
                        }}
                        height='75px'
                        width='75px'/>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="subtitle">
                        {props.text}
                    </Typography>                            
                </Grid>
            </Grid>
        </div>
    )
}

export default FeatureItem;