import React, { useState, useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

import Moment from 'react-moment';
import 'moment/locale/es';

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

import { Slider } from './layouts/Slider'
import { Sidebar } from './layouts/Sidebar'

export const Article = () => {

    let url = Global.url;
    const { id } = useParams();

    const [state, setState] = useState({
        article: false,
        status: null
    });

    const { article, status } = state;

    function getArticle(id) {
        axios.get(url + "article/" + id)
            .then(res => {
                console.log('data', res.data)

                setState({
                    ...state,
                    article: res.data.article,
                    status: 'success'
                });
            })
            .catch(err => {
                console.log('err', err.response)

                setState({
                    ...state,
                    article: 'false',
                    status: 'success'
                });
            })
    }

    function deleteArticle(id) {
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
                    axios.delete(url + 'article/' + id)
                        .then(res => {
                            console.log('data delete', res.data)

                            setState({
                                ...state,
                                article: res.data.article,
                                status: 'deleted'
                            });

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

    // Solo se ejecutara una unica vez y cuando el componente es montado la primera vez
    useEffect(() => {
        // console.log('useEffect called!')
        getArticle(id);
    }, []);

    if (status === 'deleted') {
        return (
            <Navigate to="/blog" />
        )
    }

    return (
        <React.Fragment>
            <Slider
                titulo="Articulo"
                size="slider-small"
            />

            <div className="center">
                <div id="content">

                    {/* Detalle del Articulo */}
                    {article &&
                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {article.image != null ? (
                                    <img src={url + 'get-image/' + article.image} alt={article.title} />
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
                            <button onClick={() => deleteArticle(article._id)} className="btn btn-danger">Eliminar</button>
                            <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>

                            <div className="clearfix"></div>
                        </article>
                    }

                    {!article && status === 'success' &&
                        <div id="article">
                            <h2 className="subheader">El artículo no exíste</h2>
                            <p>Intentalo de nuevo más tarde</p>
                        </div>
                    }

                    {status == null &&
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
