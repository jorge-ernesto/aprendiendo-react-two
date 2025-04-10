import React, { useState, useEffect } from 'react'
import { EjemploComponente } from './EjemploComponente';
import { MiComponente } from './MiComponente';
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';

export const SeccionPruebas = () => {

    // let seccionEstado = true

    const [state, setState] = useState({
        contador: 0
    });

    // En React, al manejar eventos se pasa un objeto de evento (Event Object) como primer parámetro en el callback de los eventos.
    // El objeto de evento (usualmente abreviado como "e") contiene información sobre el evento que se ha disparado, como el tipo de evento, el elemento que lo disparó, la posición del cursor, etc.
    function sumar(e, cantidad) {
        setState({
            ...state,
            contador: state.contador + cantidad
        });
    }

    function sumar_(cantidad) {
        setState({
            ...state,
            contador: state.contador + cantidad
        });
    }

    function restar(e, cantidad) {
        setState({
            ...state,
            contador: state.contador - cantidad
        });
    }

    // holaMundo(nombre, edad) {
    function holaMundo(nombre, edad) {
        // ESTA VARIABLE ES UN OBJETO DE JSX
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad}</h3>
            </div>
        )
        return presentacion
    }

    // Solo se ejecutara una unica vez y cuando el componente es montado la primera vez
    useEffect(() => {
        // console.log('useEffect called!')
        sumar(null, 2);
    }, []);

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
                    {holaMundo(nombre, edad)}

                    <h2 className="subheader">Componentes</h2>
                    <div className="componentes">
                        <EjemploComponente />
                        <MiComponente
                            saludo="Hola desde SeccionPruebas"
                        />
                    </div>

                    <h2 className="subheader">Estado</h2>
                    <p>
                        Contador: {state.contador}
                    </p>
                    <p>
                        <input type="button" value="Sumar" onClick={(e) => sumar(e, 1)} />
                        <input type="button" value="Sumar_" onClick={() => sumar_(1)} />
                        <input type="button" value="Restar" onClick={(e) => restar(e, 1)} />
                    </p>
                </section>

                <Sidebar />

                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )

}
