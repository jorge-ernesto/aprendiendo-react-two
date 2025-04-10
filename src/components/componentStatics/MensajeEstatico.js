// En React, si queremos definir un componente que no requiere ningún tipo de lógica compleja ni estado interno, podemos crear un componente funcional en lugar de un componente de clase que extiende la clase Component.
// Un componente funcional es simplemente una función que devuelve JSX. Como resultado, no hay necesidad de extender la clase Component ni de definir un método render, porque el componente en sí ya es una función que devuelve JSX.
import React from 'react'

// En este código estamos definiendo un componente de función llamado MensajeEstatico. Este componente acepta props como parámetro, que es un objeto que contiene todas las propiedades que se le pasan al componente.
// Dentro del componente, estamos renderizando un elemento h1 que incluye el texto "¡Hola soy el mensaje estatico!" y dos propiedades dinámicas: props.mensaje_adicional y props.otro_mensaje. Estas propiedades se definen en el componente que renderiza el componente MensajeEstatico, y se pasan al componente como parámetros.
// En resumen, los props son un mecanismo que nos permite pasar datos entre componentes en React. Podemos usarlos para personalizar la apariencia o el comportamiento de un componente y hacer que se adapte a diferentes situaciones.
export const MensajeEstatico = (props) => {
    return (
        <h1>¡Hola soy el mensaje estatico! {props.mensaje_adicional} {props.otro_mensaje}</h1>
    )
}
