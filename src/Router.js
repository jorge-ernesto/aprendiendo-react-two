// Importar Librerias
// `react` es la biblioteca principal de React, que se utiliza para construir interfaces de usuario.
import React from 'react'
// `BrowserRouter` es el componente que permite la navegación por las rutas en el lado del cliente mediante la actualización del historial del navegador.
// `Routes` es el componente que envuelve a los componentes Route y se utiliza para asegurarse de que solo se renderice el primer componente Route que coincida con la URL actual.
// `Route` es el componente utilizado para definir una ruta en la aplicación. Define la URL a la que se corresponderá, y qué componente se renderizará si la URL coincide con la ruta.
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

// Importar componentes
// Pruebas
import { SeccionPruebas } from './components/SeccionPruebas';
import { MiComponente } from './components/MiComponente';
// Layouts
import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
// Contenido
import { Home } from './components/Home';
import { Blog } from './components/Blog';
import { Article } from './components/Article';
import { SearchRedirect, Search } from './components/Search';
import { CreateArticle } from './components/CreateArticle';
import { EditArticle } from './components/EditArticle';
import { Peliculas } from './components/Peliculas';
import { Formulario } from './components/Formulario';
import { Error } from './components/Error';

const PaginaPruebas = () => {
    let { nombre, apellidos } = useParams();

    return (
        <div id="content">
            <h1>Acerca de nosotros</h1>
            <p>Nombre: {nombre}</p>
            {apellidos &&
                <p>Apellidos: {apellidos}</p>
            }
        </div>
    );
}

export const Router = () => {

    return (
        <BrowserRouter>

            <Header />

            {/* CONFIGURAR RUTAS Y PAGINAS */}
            <Routes>
                {/* RUTAS */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/articulo/:id" element={<Article />} />
                <Route path="/blog/redirect/:search" element={<SearchRedirect />} />
                <Route path="/blog/busqueda/:search" element={<Search />} />
                <Route path="/blog/crear" element={<CreateArticle />} />
                <Route path="/blog/editar/:id" element={<EditArticle />} />
                <Route path="/peliculas" element={<Peliculas />} />
                <Route path="/formulario" element={<Formulario />} />

                {/* PRUEBAS */}
                <Route path="/pruebas/:nombre/:apellidos?" element={<PaginaPruebas />} />
                <Route path="/primera-ruta" element={<SeccionPruebas />} />
                <Route path="/segunda-ruta" element={<MiComponente />} />
                <Route path="/pagina-1" element={
                    <React.Fragment>
                        <h1>Hola mundo desde la ruta: PAGINA 1</h1>
                        <MiComponente saludo="Hola amigo" />
                    </React.Fragment>
                } />

                {/* ERROR */}
                <Route path="*" element={<Error />} />
            </Routes>
            {/* CERRAR CONFIGURAR RUTAS Y PAGINAS */}

            <Footer />

        </BrowserRouter>
    )

}
