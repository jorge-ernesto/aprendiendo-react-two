import React, { Component } from 'react'
import Slider from './layouts/Slider';
import Sidebar from './layouts/Sidebar';

class Formulario extends Component {

    // State del componente, con un objeto `user` vacio
    state = {
        user: {}
    }

    // Creamos referencias
    nombreRef = React.createRef()
    apellidosRef = React.createRef()
    bioRef = React.createRef()
    generoHombreRef = React.createRef()
    generoMujerRef = React.createRef()
    generoOtroRef = React.createRef()

    // Recibimos datos del formulario
    // recibirFormulario() {
    recibirFormulario = (e) => {
        e.preventDefault()

        let genero = 'hombre'
        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value
        } else if (this.generoOtroRef.current.checked) {
            genero = this.generoOtroRef.current.value
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero
        }
        console.log('user', user)

        this.setState({
            user: user
        })
        console.log('state', this.state)
    }

    render() {
        return (
            <React.Fragment>
                <Slider
                    titulo="Formulario"
                    size="slider-small"
                />

                <div className="center">
                    <section id="content" className="formularios">

                            <h1 className="subheader">Formulario</h1>

                            {/* Mostrar datos del formulario */}
                            <div id="user-data">
                                {this.state.user.nombre &&
                                    <p>Nombre: <strong>{this.state.user.nombre}</strong></p>
                                }
                                {this.state.user.apellidos &&
                                    <p>Apellidos: <strong>{this.state.user.apellidos}</strong></p>
                                }
                                {this.state.user.bio &&
                                    <p>Bio: <strong>{this.state.user.bio}</strong></p>
                                }
                                {this.state.user.genero &&
                                    <p>Genero: <strong>{this.state.user.genero}</strong></p>
                                }
                            </div>

                            {/* Crear un formulario */}
                            <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" name="nombre" ref={this.nombreRef} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="apellidos">Apellidos</label>
                                    <input type="text" name="apellidos" ref={this.apellidosRef} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bio">Biografia</label>
                                    <textarea name="bio" ref={this.bioRef}></textarea>
                                </div>

                                <div className="form-group radibuttons">
                                    <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre
                                    <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer
                                    <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> Otro
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

}

export default Formulario