import React, { Component } from 'react'
import Slider from './layouts/Slider';
import Sidebar from './layouts/Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <Slider
                    titulo="Bienvenido al Curso de React con Víctor Robles de victorroblesweb.es"
                    btn="Ir al blog"
                    size="slider-big"
                />

                <div className="center">
                    <div id="content">
                        {/* Lista de articulos que vendran del api rest de node */}
                        <h2 className="subHeader">Ultimos articulos</h2>
                        <Articles
                            home="true"
                        />
                    </div>

                    <Sidebar />

                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }

}

export default Home