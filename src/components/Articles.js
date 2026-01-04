import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Moment from 'react-moment';
import 'moment/locale/es';

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

export const Articles = ({ home, search }) => {

    let url = Global.url

    const [state, setState] = useState({
        articles: {},
        status: null
    });

    function getArticles() {
        axios.get(url + "articles")
            .then(res => {
                console.log('data', res.data)

                // El método setState() de React es asincrónico, lo que significa que cuando
                // llamas a console.log('state', state) inmediatamente después de
                // setState(), no se garantiza que el estado se haya actualizado todavía.
                // Si necesitas hacer algo después de que el estado se actualice, debes pasar una
                // función de devolución de llamada como segundo argumento de setState(),
                // que se ejecutará después de que se complete la actualización del estado.
                setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', state);
                })
            })
    }

    function getLastArticles() {
        axios.get(url + "articles/last")
            .then(res => {
                console.log('data', res.data)

                setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', state);
                })
            })
    }

    function getLastArticlesBySearch(search) {
        axios.get(url + "search/" + search)
            .then(res => {
                console.log('data', res.data)

                setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', state);
                })
            })
            .catch(err => {
                console.log('err', err.response)

                setState({
                    articles: [],
                    status: 'success'
                }, () => {
                    console.log('state', state);
                })
            })
    }

    // Solo se ejecutara una unica vez y cuando el componente es montado la primera vez
    useEffect(() => {
        // console.log('useEffect called!')

        if (home === 'true') {
            getLastArticles()
        } else if (search && search !== null && search !== undefined) {
            getLastArticlesBySearch(search)
        } else {
            getArticles()
        }
    }, []);

    if (state.articles && state.articles.length >= 1) {

        let listArticles = state.articles.map((article) => {
            return (
                <article className="article-item" id="article-template" key={article._id}>
                    <div className="image-wrap">
                        {article.image != null ? (
                            <img src={url + 'get-image/' + article.image} alt={article.title} />
                        ) : (
                            <img src={ImageDefault} alt={article.title} />
                        )
                        }
                    </div>

                    <h2>{article.title}</h2>
                    <span className="date">
                        <Moment locale="es" fromNow>{article.date}</Moment>
                    </span>
                    <Link to={'/blog/articulo/' + article._id}>Leer más</Link>

                    <div className="clearfix"></div>
                </article>
            )
        })

        return (
            <div id="articles">
                {listArticles}
            </div>
        )
    } else if (state.articles && state.articles.length === 0 && state.status === "success") {
        return (
            <div id="articles">
                <h2 className="subheader">No hay articulos para mostrar</h2>
                <p>Todavia no hay contenido en esta sección</p>
            </div>
        )
    } else {
        return (
            <div id="articles">
                <h2 className="subheader">Cargando...</h2>
                <p>Espere mientras carga el contenido</p>
            </div>
        )
    }

}
