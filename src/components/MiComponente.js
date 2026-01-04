import React from 'react'
import { useParams } from 'react-router-dom'

export const MiComponente = () => {

    let receta = {
        nombre: 'Pizza',
        ingredientes: ['Tomate', 'Queso', 'Jamon cocido'],
        calorias: 400
    }
    const { saludo } = useParams();

    return (
        // Tambien podemos usar como elemento primario:
        // <div id="content" className="mi-componente">
        // <React.Fragment></React.Fragment>
        <React.Fragment>
            <h1 style={{ color: "red" }}>Hola soy el componente llamado: MiComponente</h1>
            <h2>Estoy probando el componente</h2>
            <hr />

            <h3>{'Receta: ' + receta.nombre}</h3>
            <h3>{'Calorias: ' + receta.calorias}</h3>
            <hr />

            {/* Recorremos array con la funcion `map`.
            Es necesario usar la propiedad `key` al renderizar listas en React para que el proceso de reconciliación de React pueda optimizar el renderizado y actualizar solo los elementos que han cambiado.
            Cada elemento de la lista debe tener un identificador único para el atributo `key`, y en este caso, se usa el índice `index` como clave.
            Estos comentarios estan dentro de un objeto de JSX por lo que es necesarios comentarlos asi */}
            <ol>
                {
                    receta.ingredientes.map((ingrediente, index) => {
                        console.log(ingrediente)
                        return (
                            <li key={index}>{ingrediente}</li>
                        )
                    })
                }
            </ol>
            <hr />

            {saludo &&
                <React.Fragment>
                    <h1>DESDE UNA PROP</h1>
                    <h3>{saludo}</h3>
                </React.Fragment>
            }
            <hr />
        </React.Fragment>
    )

}
