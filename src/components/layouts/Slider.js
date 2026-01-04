import React from 'react'

export const Slider = (props) => {

    return (
        // Un Slider puede ser también una marquesina o un cintillo
        // console.log("slider", props)
        <div id="slider" className={props.size}>
            <h1>{props.titulo}</h1>
            {props.btn &&
                <a href="/" className="btn-white">{props.btn}</a>
            }
        </div>
    )

}
