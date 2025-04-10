/*
Aquí hay una explicación línea por línea del código:

import React from 'react';                                        : Esto importa la biblioteca React, que es una biblioteca popular de JavaScript utilizada para construir interfaces de usuario en la web.
import ReactDOM from 'react-dom/client';                          : Esto importa la biblioteca ReactDOM, que es una biblioteca utilizada para representar los componentes de React en el navegador. La versión utilizada en este código se optimiza para la carga en el cliente.
import './index.css';                                             : Esto importa un archivo CSS que contiene estilos para la aplicación.
import App from './App';                                          : Esto importa el componente App desde el archivo App.js, que se encuentra en la misma carpeta que el archivo actual.
import reportWebVitals from './reportWebVitals';                  : Esto importa una función que se utiliza para medir el rendimiento de la aplicación en el navegador.

const root = ReactDOM.createRoot(document.getElementById('root'));: Esto crea un punto de entrada en el DOM (documento del navegador) para nuestra aplicación. La función createRoot de ReactDOM toma un elemento del DOM donde se representará la aplicación.
root.render(...);                                                 : Esto representa el componente App en el DOM utilizando el método render del punto de entrada root. El componente App se renderiza dentro de un elemento React.StrictMode, que es un componente especial de React que proporciona herramientas de depuración y ayuda a evitar ciertos errores comunes.
reportWebVitals();                                                : Esto llama a la función reportWebVitals, que se utiliza para medir el rendimiento de la aplicación en el navegador.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
