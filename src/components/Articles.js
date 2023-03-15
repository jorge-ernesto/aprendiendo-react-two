import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import Moment from 'react-moment';
import 'moment/locale/es';

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

class Articles extends Component {

    url = Global.url

    state = {
        articles: {},
        status: null
    }

    // componentWillMount() {
    UNSAFE_componentWillMount() {
        let home = this.props.home
        let search = this.props.search

        if (home === 'true') {
            this.getLastArticles()
        } else if (search && search !== null && search !== undefined) {
            this.getLastArticlesBySearch(search)
        } else {
            this.getArticles()
        }
    }

    getArticles = () => {
        axios.get(this.url + "articles")
            .then(res => {
                console.log('data', res.data)

                // El método setState() de React es asincrónico, lo que significa que cuando
                // llamas a console.log('state', this.state) inmediatamente después de
                // this.setState(), no se garantiza que el estado se haya actualizado todavía.
                // Si necesitas hacer algo después de que el estado se actualice, debes pasar una
                // función de devolución de llamada como segundo argumento de setState(),
                // que se ejecutará después de que se complete la actualización del estado.
                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
    }

    getLastArticles = () => {
        axios.get(this.url + "articles/last")
            .then(res => {
                console.log('data', res.data)

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
    }

    getLastArticlesBySearch = (search) => {
        axios.get(this.url + "search/" + search)
            .then(res => {
                console.log('data', res.data)

                this.setState({
                    articles: res.data.articles,
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
            .catch(err => {
                console.log('err', err.response)

                this.setState({
                    articles: [],
                    status: 'success'
                }, () => {
                    console.log('state', this.state);
                })
            })
    }

    render() {
        if (this.state.articles.length >= 1) {

            let listArticles = this.state.articles.map((article) => {
                return (
                    <article className="article-item" id="article-template" key={article._id}>
                        <div className="image-wrap">
                            {article.image != null ? (
                                <img src={this.url + 'get-image/' + article.image} alt={article.title} />
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
        } else if (this.state.articles.length === 0 && this.state.status === "success") {
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

}

export default Articles