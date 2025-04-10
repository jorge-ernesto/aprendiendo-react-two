import React from 'react'
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';
import { Articles } from './Articles';

export const Blog = () => {

    return (
        <React.Fragment>
            <Slider
                titulo="Blog"
                size="slider-small"
            />

            <div className="center">
                <div id="content">
                    {/* Lista de articulos que vendran del api rest de node */}
                    <Articles />
                </div>

                <Sidebar
                    blog="true"
                />

                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )

}
