import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import SimpleReactValidator from 'simple-react-validator'
import './util/locale_es'
import swal from 'sweetalert'

import Global from './../Global'

import { Slider } from './layouts/Slider'
import { Sidebar } from './layouts/Sidebar'

// Validacion formularios y alertas

export const CreateArticle = () => {

    let url = Global.url;
    let validator = new SimpleReactValidator({ locale: 'es' });

    // State del componente
    const [state, setState] = useState({
        article: {},
        status: null,
        selectedFile: null
    });

    // Creamos referencias
    const titleRef = React.createRef()
    const contentRef = React.createRef()

    // Actualizamos información del formulario al state
    function changeState() {
        let article = {
            title: titleRef.current.value,
            content: contentRef.current.value
        }

        setState({
            ...state,
            article: article,
        });
    }

    // Actualizamos informacion de la imagen al state
    function fileChange(event) {
        // console.log('file0', event)

        setState({
            ...state,
            selectedFile: event.target.files[0],
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
            axios.post(url + 'save', state.article)
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

                    <h1 className="subheader">Crear Articulo</h1>

                    {/* Crear un formulario para Crear Articulo */}
                    <form className="mid-form" onSubmit={saveArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={titleRef} onChange={changeState} />
                            {validator.message('title', state.article.title, 'required')} {/* required|alpha_num_space */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={contentRef} onChange={changeState} ></textarea>
                            {validator.message('content', state.article.content, 'required')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={fileChange} />
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
