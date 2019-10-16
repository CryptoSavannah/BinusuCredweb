import React from 'react';
import { Ellipsis } from 'react-spinners-css';

export function Loader3() {
    return(
        <div style={{"text-align":"center"}}> 
            <Ellipsis 
                size={200}
                color="blue"
                style= {{
                    "display":"inline-block",
                    "position": "relative",
                }}
            />
        </div>
    )
}