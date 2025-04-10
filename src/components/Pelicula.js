import React from 'react'

export const Pelicula = (props) => {

    function marcar() {
        props.marcarFavorita(props.pelicula, props.indice)
    }

    // La desestructuración (también conocida como "destructuring" en inglés) es una característica de JavaScript
    // que permite extraer valores de objetos o arreglos y asignarlos a variables individuales.
    // Es una forma de escribir código más concisa y legible, ya que evita la necesidad de repetir el nombre del objeto o arreglo varias veces.
    const pelicula = props.pelicula
    const { titulo, image } = props.pelicula
    const indice = props.indice

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
                {/* <button onClick={props.marcarFavorita}>
                    Marcar como favorita
                </button> */}

                {/* En evento onClick, si la funcion no tiene parametros, pero usas parentesis (cosa que no es necesario), debes usar una función anonima */}
                {/* <button onClick={() => props.marcarFavorita()}>
                    Marcar como favorita
                </button> */}

                {/* En evento onClick, si la funcion tiene parametros, debes usar una función anonima */}
                <button onClick={() => props.marcarFavorita(pelicula, indice)}>
                    Marcar como favorita
                </button>

                {/* En evento onClick, también se puede usar este metodo, pero no me agrada, ensucia el codigo */}
                <button onClick={marcar}>
                    Marcar como favorita
                </button>

            <div className="clearfix"></div>
        </article>
    )

}
