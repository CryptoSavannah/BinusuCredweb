import React from 'react';
import { Spinner } from 'react-spinners-css';

export function Loader2() {
    return(
        <div style={{"text-align":"center"}}> 
            <Spinner 
            size={400}
            color="black"
            style= {{
                "display":"inline-block",
                "position": "relative",
                "margin-top": "30vh",
            }}
            />;
            <h4 style={{"margin-bottom": "40vh"}}>Scraping the Space-Time Continuum</h4>
        </div>
    )
}