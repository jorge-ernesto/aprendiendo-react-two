import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

const Prueba = () => {
    return (
        <h1>Prueba</h1>
    )
}

const SearchRedirect = () => {
    let { search } = useParams();
    return (
        <Navigate to={'/blog/busqueda/' + search} />
    )
}

export { Prueba, SearchRedirect }