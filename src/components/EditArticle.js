import React, { Component } from 'react'
import withRouter from './withRouter'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './util/locale_es'
import swal from 'sweetalert'

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

import Slider from './layouts/Slider'
import Sidebar from './layouts/Sidebar'

// 1. Tenemos recoger el id del articulo a editar de la url
// 2. Crear un metodo para sacar ese objeto del backend
// 3. Replobar / reLlenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una petición al backend

class EditArticle extends Component {

    url = Global.url

    articleId = null

    // State del componente
    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    // Creamos referencias
    titleRef = React.createRef()
    contentRef = React.createRef()

    // componentWillMount() {
    UNSAFE_componentWillMount() {
        this.articleId = this.props.params.id
        this.getArticle(this.articleId)

        this.validator = new SimpleReactValidator({ locale: 'es' });
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                }, () => console.log('state getArticle', this.state))
            })
    }

    // Actualizamos información del formulario al state
    changeState = () => {
        let article = {
            title: this.titleRef.current.value,
            content: this.contentRef.current.value,
            image: this.state.article.image
        }

        this.setState({
            article: article
        }, () => console.log('state changeState', this.state))
    }

    // Actualizamos informacion de la imagen al state
    fileChange = (event) => {
        // console.log('file0', event)

        this.setState({
            selectedFile: event.target.files[0]
        }, () => console.log('state fileChange', this.state))
    }

    // Guardamos articulo
    saveArticle = (e) => {
        e.preventDefault()

        // Rellenar state con formulario
        // this.changeState()

        // Validacion de formulario
        if (this.validator.allValid()) {

            // Hacer una petición http por post para guardar el articulo
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    console.log('data save', res.data)

                    // Validamos articulo
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        }, () => {
                            console.log('state save', this.state)

                            // Alerta visual
                            swal(
                                'Articulo creado',
                                'El articulo ha sido creado correctamente',
                                'success'
                            )

                            // Subir la imagen
                            if (this.state.selectedFile !== null) {
                                this.uploadImage()
                            } else {
                                this.setState({
                                    status: 'success'
                                })
                            }
                        })
                    } else {
                        this.setState({
                            status: 'failed'
                        }, () => console.log('state save', this.state))
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            }, () => console.log('state save', this.state))

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    // Motivo por el que uploadImage esta dentro de la funcion de devolucion de llamada de this.setState:
    // Recordar que this.setState, es una operacion asincrona y puede que no haya terminado de actualizarse cuando intentamos acceder a la propiedad this.state.article._id
    // Para solucionar esto, puedes usar el segundo argumento de setState que es una función de devolución de llamada que se ejecutará después de que el estado se haya actualizado. Esto garantiza que el estado se haya actualizado antes de intentar acceder a él.
    uploadImage = () => {
        // Sacar el id del articulo guardado
        let articleId = this.state.article._id

        // Crear form data y añadir fichero
        const formData = new FormData()
        formData.append(
            'file0',
            this.state.selectedFile,
            this.state.selectedFile.name
        )

        // Petición ajax
        axios.post(this.url + 'upload-image/' + articleId, formData)
            .then(res => {
                console.log('data upload-image', res.data)

                // Validamos articulo
                if (res.data.article) {
                    this.setState({
                        article: res.data.article,
                        status: 'success'
                    }, () => console.log('state upload-image', this.state))
                } else {
                    this.setState({
                        article: res.data.article,
                        status: 'failed'
                    }, () => console.log('state upload-image', this.state))
                }
            })
    }

    render() {
        // render siempre se esta comprobando continuamente
        // render siempre esta comprobando los cambios en el componente
        if (this.state.status === 'success') {
            return (
                <Navigate to={'/blog'} />
            )
        }

        let article = this.state.article

        return (
            <React.Fragment>
                <Slider
                    titulo="Crear Articulo"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content">

                        <h1 className="subheader">Editar Articulo</h1>

                        {/* Crear un formulario para Crear Articulo */}
                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="form-group">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChange} />

                                {/* Mostramos imagen */}
                                <div className="image-wrap">
                                    {article.image != null ? (
                                        <img src={this.url + 'get-image/' + article.image} alt={article.title} className="thumb" />
                                    ) : (
                                        <img src={ImageDefault} alt={article.title} className="thumb" />
                                    )
                                    }
                                </div>
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />
                        </form>

                    </div>

                    <Sidebar />

                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(EditArticle)