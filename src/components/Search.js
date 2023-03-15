import React, { Component } from 'react'
import withRouter from './withRouter';
import Slider from './layouts/Slider';
import Sidebar from './layouts/Sidebar';
import Articles from './Articles';

class Search extends Component {

    render() {
        console.log('props', this.props)
        let search = this.props.params.search;

        return (
            <React.Fragment>
                <Slider
                    titulo={"Busqueda: " + search}
                    size="slider-small"
                />

                <div className="center">
                    <div id="content">
                        {/* Lista de articulos que vendran del api rest de node */}
                        <Articles
                            search={search}
                        />
                    </div>

                    <Sidebar
                        blog="true"
                    />

                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(Search)