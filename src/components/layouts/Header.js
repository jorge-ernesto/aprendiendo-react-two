import React from 'react'
import logo from '../../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'

export const Header = () => {

    return (
        <header id="header">
            <div className="center">
                {/* LOGO */}
                <div id="logo">
                    <img src={logo} className="app-logo" alt="Logotipo" />
                    <span id="brand">
                        <strong>Blog</strong>React
                    </span>
                </div>

                {/* MENU */}
                <nav id="menu">
                    <ul>
                        <li>
                            <NavLink to="/home">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to="/peliculas">Peliculas</NavLink>
                        </li>
                        <li>
                            <NavLink to="/formulario">Contacto</NavLink>
                        </li>
                        <li>
                            {/* De este modo, con className y navData, podemos manipular el estilo, sin embargo si no pusieramos nada, */}
                            {/* mostraria por defecto el estilo "active", como en los ejemplos de arriba */}
                            <NavLink to="/pruebas/Ernesto/Si" className={(navData) => (navData.isActive ? "active" : "none")}>
                                Acerca de nosotros
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* LIMPIAR FLOTADOS */}
                <div className="clearfix"></div>
            </div>
        </header>
    )

}
