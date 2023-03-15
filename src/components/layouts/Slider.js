import React, {Component} from 'react'

class Slider extends Component {

    render(){
        // Un Slider puede ser también una marquesina o un cintillo
        // console.log("slider", this.props)
        return (
            <div id="slider" className={this.props.size}>
                <h1>{this.props.titulo}</h1>
                {this.props.btn &&
                    <a href="/" className="btn-white">{this.props.btn}</a>
                }
            </div>
        )
    }

}

export default Slider