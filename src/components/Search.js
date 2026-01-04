import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';
import { Articles } from './Articles';

export const SearchRedirect = () => {

    let { search } = useParams();

    if (search === 'all') {
        return (
            <Navigate to={'/blog'} />
        )
    } else {
        return (
            <Navigate to={'/blog/busqueda/' + search} />
        )
    }
}

export const Search = () => {

    const { search } = useParams();

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