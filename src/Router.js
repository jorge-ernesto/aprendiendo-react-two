// Importamos tanto el módulo principal de `React` como el objeto `Component`
// lo que nos permite acceder a las funciones y clases proporcionadas por ambos.
import React, { Component } from 'react'

// Importamos los objetos `BrowserRouter`, `Routes` y `Route`
// `BrowserRouter` es el componente que permite la navegación por las rutas en el lado del cliente mediante la actualización del historial del navegador.
// `Routes` es el componente que envuelve a los componentes Route y se utiliza para asegurarse de que solo se renderice el primer componente Route que coincida con la URL actual.
// `Route` es el componente utilizado para definir una ruta en la aplicación. Define la URL a la que se corresponderá, y qué componente se renderizará si la URL coincide con la ruta.
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

// Importar Componentes
// Pruebas
import MiComponente from './components/MiComponente';
import SeccionPruebas from './components/SeccionPruebas';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
// Layouts
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
// Contenido
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';
import Search from './components/Search';
import { SearchRedirect } from './components/componentStatics/Util'
import Article from './components/Article';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

// Importar Componente (Esto actua como un componente funcional, recordar que tambien existen los componentes de clase)
// function PaginaPruebas() {
const PaginaPruebas = () => {
    let { nombre, apellidos } = useParams();

    return (
        <div id="content">
            <h1>Pagina de pruebas</h1>
            <p>Nombre: {nombre}</p>
            {apellidos &&
                <p>Apellidos: {apellidos}</p>
            }
        </div>
    );
}

// Al importar el objeto {Component}
// podemos usar `extends Component` en lugar de `extends React.Component`
class Router extends Component {

    render() {
        return (
            <BrowserRouter>

                <Header />

                {/* CONFIGURAR RUTAS Y PAGINAS */}
                <Routes>
                    {/* RUTAS */}
                    <Route path="/"                      element={<Home />} />  {/* <Peliculas /> */}
                    <Route path="/home"                  element={<Home />} />  {/* <Peliculas /> */}
                    <Route path="/blog"                  element={<Blog />} />  {/* <SeccionPruebas /> */}
                    <Route path="/blog/articulo/:id"     element={<Article />} />
                    <Route path="/blog/busqueda/:search" element={<Search />} />
                    <Route path="/redirect/:search"      element={<SearchRedirect />} />
                    <Route path="/blog/crear"            element={<CreateArticle />} />
                    <Route path="/blog/editar/:id"       element={<EditArticle />} />


                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/peliculas"  element={<Peliculas />} />

                    {/* PRUEBAS */}
                    <Route path="/primera-ruta" element={<SeccionPruebas />} />
                    <Route path="/segunda-ruta" element={<MiComponente />} />
                    <Route path="/pagina-1" element={
                        <React.Fragment>
                            <h1>Hola mundo desde la ruta: PAGINA 1</h1>
                            <MiComponente saludo="Hola amigo" />
                        </React.Fragment>
                    } />
                    <Route path="/pruebas/:nombre/:apellidos?" element={<PaginaPruebas />} />

                    {/* ERROR */}
                    <Route path="*" element={<Error />} />
                </Routes>
                {/* CERRAR CONFIGURAR RUTAS Y PAGINAS */}
                {/*
                <SeccionPruebas/>
                <Peliculas/>
                */}

                <Footer />

            </BrowserRouter>
        )
    }

}

export default Router