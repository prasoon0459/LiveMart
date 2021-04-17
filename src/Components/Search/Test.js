import { Button } from '@material-ui/core'
import React from 'react'
const Test = () => {
    const [m, set_m] = React.useState(0)

    const handleClick = (event) => {
        set_m(m + 1);
        console.log(m)
    }

    return (
        <div>
            <Button onClick={handleClick}>
                {m}
            </Button>
        </div>
    )
}

export default Test;