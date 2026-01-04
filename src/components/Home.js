import React from 'react'
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';
import { Articles } from './Articles';

export const Home = () => {

    return (
        <React.Fragment>
            <Slider
                titulo="Blog React - Todo lo que puedes hacer"
                btn="Ir al blog"
                size="slider-big"
            />

            <div className="center">
                <div id="content">
                    {/* Lista de articulos que vendran del api rest de node */}
                    <h2 className="subheader">Ultimos articulos</h2>
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
