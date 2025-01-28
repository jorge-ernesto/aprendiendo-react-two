import React, { Component } from 'react'

class Pelicula extends Component {

    marcar = () => {
        this.props.marcarFavorita(this.props.pelicula, this.props.indice)
    }

    render() {
        // La desestructuración (también conocida como "destructuring" en inglés) es una característica de JavaScript
        // que permite extraer valores de objetos o arreglos y asignarlos a variables individuales.
        // Es una forma de escribir código más concisa y legible, ya que evita la necesidad de repetir el nombre del objeto o arreglo varias veces.
        const pelicula = this.props.pelicula
        const { titulo, image } = this.props.pelicula
        const indice = this.props.indice

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>

                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <a href="/">Leer más</a>

                {/* Boton para marcar pelicula como favorita */}
                    {/* En evento onClick, si la funcion no tiene parametros, puedes pasarla directamente sin usar función anonima */}
                    {/* <button onClick={this.props.marcarFavorita}>
                        Marcar como favorita
                    </button> */}

                    {/* En evento onClick, si la funcion no tiene parametros, pero usas parentesis (cosa que no es necesario), debes usar una función anonima */}
                    {/* <button onClick={() => this.props.marcarFavorita()}>
                        Marcar como favorita
                    </button> */}

                    {/* En evento onClick, si la funcion tiene parametros, debes usar una función anonima */}
                    <button onClick={() => this.props.marcarFavorita(pelicula, indice)}>
                        Marcar como favorita
                    </button>

                    {/* En evento onClick, también se puede usar este metodo, pero no me agrada, ensucia el codigo */}
                    {/* <button onClick={this.marcar}>
                        Marcar como favorita
                    </button> */}

                <div className="clearfix"></div>
            </article>
        )
    }

}

export default Pelicula