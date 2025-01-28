import React, { Component } from 'react'
import withRouter from './withRouter'
import { Navigate, Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

import Moment from 'react-moment';
import 'moment/locale/es';

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

import Slider from './layouts/Slider'
import Sidebar from './layouts/Sidebar'

class Article extends Component {

    url = Global.url

    state = {
        article: false,
        status: null
    }

    // componentWillMount() {
    UNSAFE_componentWillMount() {
        this.getArticle()
    }

    getArticle = () => {
        let id = this.props.params.id

        axios.get(this.url + "article/" + id)
            .then(res => {
                console.log('data', res.data)

                this.setState({
                    article: res.data.article,
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
            .catch(err => {
                console.log('err', err.response)

                this.setState({
                    article: false,
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
    }

    deleteArticle = (id) => {
        // Confirmar eliminacion
        swal({
            title: "¿Estas seguro?",
            text: "Borrarás permanentemente un articulo",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    // Eliminar articulo
                    axios.delete(this.url + 'article/' + id)
                        .then(res => {
                            console.log('data delete', res.data)

                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            }, () => console.log('state delete', this.state))

                            swal(
                                'Articulo borrado',
                                'El articulo ha sido borrado correctamente',
                                'success'
                            )
                        })

                } else {
                    swal(
                        'Tranquilo!!',
                        'No se ha borrado nada',
                        'success'
                    )
                }
            });
    }

    render() {
        if (this.state.status === 'deleted') {
            return <Navigate to="/blog" />
        }

        let article = this.state.article

        return (
            <React.Fragment>
                <Slider
                    titulo="Articulo"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content">

                        {/* Detalle del Articulo */}
                        {this.state.article &&
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} />
                                    ) : (
                                        <img src={ImageDefault} alt={article.title} />
                                    )
                                    }
                                </div>

                                <h1 className="subheader">{article.title}</h1>
                                <span className="date">
                                    <Moment locale="es" fromNow>{article.date}</Moment>
                                </span>
                                <p>
                                    {article.content}
                                </p>

                                {/* En evento onClick, si la funcion tiene parametros, debes usar una función anonima */}
                                <button onClick={() => this.deleteArticle(article._id)} className="btn btn-danger">Eliminar</button>
                                <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>

                                <div className="clearfix"></div>
                            </article>
                        }

                        {!this.state.article && this.state.status === 'success' &&
                            <div id="article">
                                <h2 className="subheader">El artículo no exíste</h2>
                                <p>Intentalo de nuevo más tarde</p>
                            </div>
                        }

                        {this.state.status == null &&
                            <div id="article">
                                <h2 className="subheader">Cargando...</h2>
                                <p>Espere unos segundos</p>
                            </div>
                        }

                    </div>

                    <Sidebar />

                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(Article)