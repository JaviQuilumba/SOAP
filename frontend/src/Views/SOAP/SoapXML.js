import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './estilos.css';

function SoapXML() {
    const [movies, setMovies] = useState([]);
    const [moviesXML, setMoviesXML] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch('http://localhost:3001/xml/movies')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.text();
            })
            .then(str => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, "application/xml");
                const moviesArray = Array.from(xmlDoc.getElementsByTagName("movie")).map(movie => ({
                    id: movie.getElementsByTagName("id")[0].textContent,
                    title: movie.getElementsByTagName("title")[0].textContent,
                    director: movie.getElementsByTagName("director")[0].textContent,
                    year: movie.getElementsByTagName("year")[0].textContent
                }));
                setMovies(moviesArray);
                setMoviesXML(str);
            })
            .catch(error => console.error('Error fetching movies:', error));
    };


    return (
        <div>
            <h1>Películas (XML)</h1>
            <pre>{moviesXML}</pre>
            <h2>Lista de Películas</h2>
            {movies.length > 0 ? (
                <ul>
                    {movies.map(movie => (
                        <li key={movie.id}>
                            <h3>{movie.title}</h3>
                            <p><strong>Director:</strong> {movie.director}</p>
                            <p><strong>Año:</strong> {movie.year}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay películas disponibles.</p>
            )}
            <div className="button-container">
                <Link to="/">
                    <button className="styled-button">Volver</button>
                </Link>
            </div>
        </div>
    );
}

export default SoapXML;
