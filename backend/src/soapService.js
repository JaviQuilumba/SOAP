const express = require('express');
const xml2js = require('xml2js');
const builder = new xml2js.Builder();

const router = express.Router();

let movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010},
    { id: 2, title: 'The Matrix', director: 'Lana and Lilly Wachowski', year: 1999},
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014},
];

//Lista Peliculas
router.get('/movies', (req, res) => {
    const xmlMovies = movies.map(movie => ({
        movie: {
            id: movie.id,
            title: movie.title,
            director: movie.director,
            year: movie.year
        }
    }));
    const xml = builder.buildObject({ movies: xmlMovies });
    res.type('application/xml');
    res.send(xml);
});

// Pelicula ID
router.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id == req.params.id);
    if (movie) {
        const xml = builder.buildObject({ movie: { ...movie } });
        res.type('application/xml');
        res.send(xml);
    } else {
        res.status(404).send('<error>Movie not found</error>');
    }
});

module.exports = router;
