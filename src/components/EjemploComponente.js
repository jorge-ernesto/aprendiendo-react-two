// Importamos tanto el módulo principal de `React` como el objeto `Component`
// lo que nos permite acceder a las funciones y clases proporcionadas por ambos.
import React, { Component } from 'react'

// Al importar el objeto {Component}
// podemos usar `extends Component` en lugar de `extends React.Component`
class EjemploComponente extends Component {

    render() {
        return (
            // Tambien podemos usar como elemento primario:
            // <div id="content" className="mi-componente">
            // <React.Fragment></React.Fragment>
            <React.Fragment>
                <h1 style={{ color: "red" }}>Hola soy el componente llamado: EjemploComponente</h1>
                <hr />
            </React.Fragment>
        )
    }

}

export default EjemploComponente