import React, { Component } from 'react'
import withRouter from './../withRouter'
import { Navigate, Link } from 'react-router-dom';

class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        redirect: false,
        search: ''
    }

    redirectToSearch = (e) => {
        e.preventDefault()

        this.setState({
            redirect: true,
            search: this.searchRef.current.value
        })
    }

    render() {
        // render siempre se esta comprobando continuamente
        // render siempre esta comprobando los cambios en el componente
        if (this.state.redirect) {
            if (this.state.search === '') {
                alert('Busqueda vacia');
            } else {
                return (
                    // de este modo redirijo a un componente que no tiene el sidebar como parte de su renderizacion
                    // ya que eso generaria un bucle
                    <Navigate to={'/redirect/' + this.state.search} />
                )
            }
        }

        // obtener parametros por url
        let search = this.props.params.search;

        return (
            <aside id="sidebar">
                {this.props.blog === "true" &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Puedes hacer esto</h3>
                        <Link to={'/blog/crear'} className="btn btn-success">Crear artículo</Link>
                    </div>
                }

                <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form onSubmit={this.redirectToSearch}>
                            <input type="text" name="search" ref={this.searchRef} defaultValue={search} />
                            <input type="submit" name="submit" value="Buscar" className="btn" />
                        </form>
                </div>
            </aside>
        )
    }

}

export default withRouter(Sidebar)