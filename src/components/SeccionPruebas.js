import React, { Component } from 'react'

// Importar Componentes
import EjemploComponente from './EjemploComponente';
import MiComponente from './MiComponente';
import Slider from './layouts/Slider';
import Sidebar from './layouts/Sidebar';

class SeccionPruebas extends Component {

    seccionEstado = true

    constructor(props) {
        super(props);
        // Variables que se van a refrescar dinamicamente
        this.state = {
            contador: 0
        }
        // Bindeamos la funciones, bind no es necesario si usamos funciones de flecha
        // this.sumar = this.sumar.bind(this)
        // this.restar = this.restar.bind(this)
    }

    // En React, al manejar eventos se pasa un objeto de evento (Event Object) como primer parámetro en el callback de los eventos.
    // El objeto de evento (usualmente abreviado como "e") contiene información sobre el evento que se ha disparado, como el tipo de evento, el elemento que lo disparó, la posición del cursor, etc.
    sumar = (e) => {
        this.setState({
            contador: this.state.contador + 1
        });
    }

    restar = (e) => {
        this.setState({
            contador: this.state.contador - 1
        });
    }

    // holaMundo(nombre, edad) {
    holaMundo = (nombre, edad) => {
        // ESTA VARIABLE ES UN OBJETO DE JSX
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad}</h3>
            </div>
        )
        return presentacion
    }

    render() {
        var nombre = "Victor Robles"
        var edad = 12

        return (
            <React.Fragment>
                <Slider
                    titulo="SeccionPruebas"
                    size="slider-small"
                />

                <div className="center">
                    <section id="content" className="seccionPruebas">
                        <h2 className="subheader">Últimos artículos</h2>
                        <p>
                            Hola bienvenido al curso de React de Victor Robles WEB !!
                        </p>

                        <h2 className="subheader">Funciones y JSX basico</h2>
                        {this.holaMundo(nombre, edad)}

                        <h2 className="subheader">Componentes</h2>
                        <div className="componentes">
                            <EjemploComponente />
                            <MiComponente
                                saludo="Hola desde SeccionPruebas"
                            />
                        </div>

                        <h2 className="subheader">Estado</h2>
                        <p>
                            Contador: {this.state.contador}
                        </p>
                        <p>
                            <input type="button" value="Sumar" onClick={this.sumar} />
                            <input type="button" value="Restar" onClick={this.restar} />
                        </p>
                    </section>

                    <Sidebar />

                    <div className="clearfix"></div>
                </div>
            </React.Fragment>
        )
    }

}

export default SeccionPruebas