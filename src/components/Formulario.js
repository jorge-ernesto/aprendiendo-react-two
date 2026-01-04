import React, { useState } from 'react'
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';
import swal from 'sweetalert'

export const Formulario = () => {

    // State del componente, con un objeto `user` vacio
    const [state, setState] = useState({
        user: {}
    });

    // Creamos referencias
    const nombreRef = React.createRef()
    const apellidosRef = React.createRef()
    const correoRef = React.createRef()
    const mensajeRef = React.createRef()
    const generoHombreRef = React.createRef()
    const generoMujerRef = React.createRef()
    const generoOtroRef = React.createRef()

    // Recibimos datos del formulario
    function recibirFormulario(e) {
        e.preventDefault()

        let genero = 'hombre'
        if (generoHombreRef.current.checked) {
            genero = generoHombreRef.current.value
        } else if (generoMujerRef.current.checked) {
            genero = generoMujerRef.current.value
        } else if (generoOtroRef.current.checked) {
            genero = generoOtroRef.current.value
        }

        var user = {
            nombre: nombreRef.current.value,
            apellidos: apellidosRef.current.value,
            correo: correoRef.current.value,
            mensaje: mensajeRef.current.value,
            genero: genero
        }
        console.log('user', user)

        setState({
            ...state,
            user: user
        });
        console.log('state', state)

        if (e.type === "submit") {
            // Alerta visual
            swal(
                'Mensaje enviado!',
                `Se ha enviado tu mensaje, la respuesta la recibiras al correo registrado: ${state.user.correo}`,
                'success'
            )

            nombreRef.current.value = ''
            apellidosRef.current.value = ''
            correoRef.current.value = ''
            mensajeRef.current.value = ''
            generoHombreRef.current.checked = true
            generoMujerRef.current.checked = false
            generoOtroRef.current.checked = false

            setState({
                ...state,
                user: {}
            });
        }
    }

    return (
        <React.Fragment>
            <Slider
                titulo="Contacto"
                size="slider-small"
            />

            <div className="center">
                <section id="content" className="formularios">

                    <h1 className="subheader">Formulario de Contacto</h1>

                    {/* Mostrar datos del formulario */}
                    <div id="user-data">
                        {state.user.nombre &&
                            <p>Nombre: <strong>{state.user.nombre}</strong></p>
                        }
                        {state.user.apellidos &&
                            <p>Apellidos: <strong>{state.user.apellidos}</strong></p>
                        }
                        {state.user.correo &&
                            <p>Correo: <strong>{state.user.correo}</strong></p>
                        }
                        {state.user.mensaje &&
                            <p>Mensaje: <strong>{state.user.mensaje}</strong></p>
                        }
                        {state.user.genero &&
                            <p>Genero: <strong>{state.user.genero}</strong></p>
                        }
                    </div>

                    {/* Crear un formulario */}
                    <form className="mid-form" onSubmit={recibirFormulario} onChange={recibirFormulario}>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" ref={nombreRef} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" ref={apellidosRef} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input type="email" name="correo" ref={correoRef} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea name="mensaje" ref={mensajeRef} required></textarea>
                        </div>

                        <div className="form-group radibuttons">
                            <input type="radio" name="genero" value="hombre" ref={generoHombreRef} defaultChecked={true} /> Hombre
                            <input type="radio" name="genero" value="mujer" ref={generoMujerRef} /> Mujer
                            <input type="radio" name="genero" value="otro" ref={generoOtroRef} /> Otro
                        </div>

                        <div className="clearfix"></div>

                        <input type="submit" value="Enviar" className="btn btn-success" />
                    </form>

                </section>

                <Sidebar />

                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )

}
