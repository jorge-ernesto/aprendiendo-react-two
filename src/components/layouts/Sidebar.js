import React, { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom';

export const Sidebar = ({ blog }) => {

    const { search } = useParams();

    const searchRef = React.createRef();

    const [state, setState] = useState({
        redirect: false,
        search: search
    });

    function redirectToSearch(e) {
        e.preventDefault()

        setState({
            ...state,
            redirect: true,
            search: searchRef.current.value
        });
    }

    if (state.redirect) {
        if (state.search.trim() === '') {
            return (
                // de este modo redirijo a un componente que no tiene el sidebar como parte de su renderizacion
                // ya que eso generaria un bucle
                <Navigate to={'/blog/redirect/all'} />
            )
        } else {
            return (
                // de este modo redirijo a un componente que no tiene el sidebar como parte de su renderizacion
                // ya que eso generaria un bucle
                <Navigate to={'/blog/redirect/' + state.search} />
            )
        }
    }

    return (
        <aside id="sidebar">
            {blog === "true" &&
                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <Link to={'/blog/crear'} className="btn btn-success">Crear artículo</Link>
                </div>
            }

            <div id="search" className="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el artículo que buscas</p>
                <form onSubmit={redirectToSearch}>
                    <input type="text" name="search" ref={searchRef} defaultValue={state.search} />
                    <input type="submit" name="submit" value="Buscar" className="btn" />
                </form>
            </div>
        </aside>
    )

}
