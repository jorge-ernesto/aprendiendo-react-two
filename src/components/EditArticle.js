import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './util/locale_es'
import swal from 'sweetalert'

import Global from './../Global'
import ImageDefault from './../assets/images/404_not_found.png'

import { Slider } from './layouts/Slider'
import { Sidebar } from './layouts/Sidebar'

// 1. Tenemos recoger el id del articulo a editar de la url
// 2. Crear un metodo para sacar ese objeto del backend
// 3. Replobar / reLlenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una petición al backend

export const EditArticle = () => {

    let url = Global.url;
    let validator = new SimpleReactValidator({ locale: 'es' });
    const { id } = useParams();

    // State del componente
    const [state, setState] = useState({
        article: {},
        status: null,
        selectedFile: null
    });

    // Creamos referencias
    const titleRef = React.createRef()
    const contentRef = React.createRef()

    // Obtenemos articulo
    function getArticle(id) {
        axios.get(url + 'article/' + id)
            .then(res => {
                setState({
                    ...state,
                    article: res.data.article
                });
            })
    }

    // Actualizamos información del formulario al state
    function changeState() {
        let article = {
            title: titleRef.current.value,
            content: contentRef.current.value,
            image: state.article.image
        }

        setState({
            ...state,
            article: article
        });
    }

    // Actualizamos informacion de la imagen al state
    function fileChange(event) {
        // console.log('file0', event)

        setState({
            ...state,
            selectedFile: event.target.files[0]
        });
    }

    // Guardamos articulo
    function saveArticle(e) {
        e.preventDefault()

        // Rellenar state con formulario
        // changeState()

        // Validacion de formulario
        if (validator.allValid()) {

            // Hacer una petición http por post para guardar el articulo
            axios.put(url + 'article/' + id, state.article)
                .then(res => {
                    console.log('data save', res.data)

                    // Validamos articulo
                    if (res.data.article) {
                        setState({
                            ...state,
                            article: res.data.article,
                            status: 'success'
                        });
                    } else {
                        setState({
                            ...state,
                            status: 'failed'
                        });
                    }
                })
        } else {
            setState({
                ...state,
                status: 'failed'
            });
        }
    }

    // Motivo por el que uploadImage esta dentro de una condicion state.status === 'success':
    // Recordar que setState, es una operacion asincrona y puede que no haya terminado de actualizarse cuando intentamos acceder a la propiedad state.article._id
    // Para solucionar esto, llamamos a uploadImage cuando se haya actualizado state.status a success

    // Motivo por el que uploadImage esta dentro de una funcion asincrona:
    // Recordar que axios.post, es una operacion asincrona y puede que no haya terminado de ejecutarse cuando intentamos redireccionar
    // Para solucionar esto, convertimos uploadImage a una función asincrona usando async/await, await hace que el código espere, pero solo dentro de una función async

    async function uploadImage() {
        // Sacar el id del articulo guardado
        let articleId = state.article._id

        // Crear form data y añadir fichero
        const formData = new FormData()
        formData.append(
            'file0',
            state.selectedFile,
            state.selectedFile.name
        )

        // Petición http
        const res = await axios.post(url + 'upload-image/' + articleId, formData)
        console.log('data upload-image', res.data)

        // Validamos articulo
        if (res.data.article) {
            setState({
                ...state,
                article: res.data.article,
                status: 'success'
            });
        } else {
            setState({
                ...state,
                article: res.data.article,
                status: 'failed'
            });
        }
    }

    // Solo se ejecutara una unica vez y cuando el componente es montado la primera vez
    useEffect(() => {
        // console.log('useEffect called!')
        getArticle(id);
    }, []);

    if (state.status === 'success') {

        async function ejecutarSuccess() {

            // Subir la imagen
            if (state.selectedFile !== null) {
                await uploadImage();
            }

            // Alerta visual
            swal(
                'Articulo creado',
                'El articulo ha sido creado correctamente',
                'success'
            );

            // Redireccionar a blog
            setState({
                ...state,
                status: 'redirect'
            });
        }

        ejecutarSuccess();
    }

    if (state.status === 'redirect') {

        // Redireccionar a blog
        return (
            <Navigate to={'/blog'} />
        )
    }

    if (state.status === 'failed') {

        // Mensajes de error
        validator.showMessages();
    }

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
                    <form className="mid-form" onSubmit={saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" defaultValue={state.article.title} ref={titleRef} onChange={changeState} />

                            {validator.message('title', state.article.title, 'required')} {/* required|alpha_num_space */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" defaultValue={state.article.content} ref={contentRef} onChange={changeState} ></textarea>

                            {validator.message('content', state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={fileChange} />

                            {/* Mostramos imagen */}
                            <div className="image-wrap">
                                {state.article.image != null ? (
                                    <img src={url + 'get-image/' + state.article.image} alt={state.article.title} className="thumb" />
                                ) : (
                                    <img src={ImageDefault} alt={state.article.title} className="thumb" />
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
