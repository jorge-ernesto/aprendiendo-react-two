import React, { useState } from 'react'
import { MensajeEstatico } from './componentStatics/MensajeEstatico'
import { Pelicula } from './Pelicula'
import { Slider } from './layouts/Slider';
import { Sidebar } from './layouts/Sidebar';

export const Peliculas = () => {

    const [state, setState] = useState({
        peliculas: [
            { titulo: 'Batman vs Superman', image: 'https://www.comicverso.com/wp-content/uploads/2019/12/destacada-batmanvssuperman.jpg' },
            { titulo: 'Gran Torino', image: 'https://diariobasta.com/wp-content/uploads/2019/08/grantorino-708x350@2x.jpg' },
            { titulo: 'Looper', image: 'https://hbomax-images.warnermediacdn.com/images/GYGa0pQQsjlXCeQEAAADJ/tileburnedin?size=1280x720&partner=hbomaxcom&v=d382bcbdf506a575c597839d837afc9f&host=art-gallery.api.hbo.com&language=en-us&w=1280' }
        ],
        nombre: 'Victor Robles',
        favorita: { titulo: '', image: '' }
    });

    function cambiarTitulo() {
        // Cambiar solo la primera pelicula
        let { peliculas } = state
        peliculas[0].titulo = "Batman Begins"

        // Numero aleatorio entre el 0 y 2
        // let {peliculas} = state
        // let random = Math.floor(Math.random() * 3)
        // peliculas[random].titulo = "Batman Begins "+random

        setState({
            ...state,
            peliculas: peliculas
        });
    }

    function marcarFavorita(pelicula, indice) {
        console.log('FAVORITA MARCADA')
        console.log(pelicula, indice)
        setState({
            ...state,
            favorita: pelicula
        });
    }

    // Metodos de ciclo de vida de los componentes - de clase en React
    /*
    componentWillMount() {
        alert("Se va a montar el componente")
    }

    componentDidMount() {
        alert("Ya se ha montado el componente")
    }

    componentWillUnmount() {
        alert("Me voy a demontar")
    }
    */

    let pStyle = {
        background: 'green',
        color: 'white',
        padding: '10px'
    }

    return (
        <React.Fragment>
            <Slider
                titulo="Peliculas"
                size="slider-small"
            />

            <div className="center">
                <section id="content" className="peliculas">
                    <h2 className="subheader">Peliculas</h2>

                    <h1 style={{ color: "red" }}>Hola soy el componente llamado: Peliculas</h1>
                    <MensajeEstatico mensaje_adicional="SALUDOS" otro_mensaje="REACT" />
                    <hr />

                    <h1 style={{ color: "red" }}>Hola soy el componente llamado: Peliculas</h1>
                    <p>Seleccion de las peliculas favoritas de {state.nombre}</p>

                    {/* Boton para cambiar titulo a pelicula */}
                    <p>
                        <button onClick={cambiarTitulo}>
                            Cambiar Titulo de Batman
                        </button>
                    </p>

                    {/* Muestra la pelicula favorita seleccionada */}
                    {/* Operador ternario */}
                    {state.favorita.titulo ? (
                        <p style={pStyle}>
                            <strong>La pelicula favorita es: </strong>
                            <span>{state.favorita.titulo}</span>
                        </p>
                    ) : (
                        <p>NO HAY PELICULA FAVORITA</p>
                    )
                    }

                    {/* Otro metodo */}
                    {state.favorita.titulo &&
                        <span></span>
                    }

                    {/* Crear componente pelicula */}
                    <div id="articles">
                        {
                            state.peliculas.map((pelicula, i) => (
                                <Pelicula
                                    key={i}
                                    pelicula={pelicula}
                                    indice={i}
                                    marcarFavorita={marcarFavorita}
                                />
                            ))
                        }
                    </div>
                    <hr />
                </section>

                <Sidebar />

                <div className="clearfix"></div>
            </div>
        </React.Fragment>
    )

}
