import express from 'express';
import { Movie } from '../models/movieModel.js';

const router = express.Router();

// Route to save a Movie
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.director ||
            !req.body.rating
        ) {
            return res.status(400).send( { message: 'Send all required fields: title, director, rating'});
        }
        const newMovie = {
            title: req.body.title,
            director: req.body.director,
            rating: req.body.rating
        };
        const movie = await Movie.create(newMovie);
        return res.status(201).send(movie);
    } catch (err) {
        console.log(err);
        res.status(500).send({message: err.message});
    }
})

// Route to get all movies from DB
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find({});
        return res.status(200).json({
            count: movies.length,
            data: movies,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err.message});
    }
})

// Route to get a single movie
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        return res.status(201).json(movie);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message});
    }
})

// Route to update a movie
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.director ||
            !req.body.rating
        ) {
            return res.status(400).send( { message: 'Send all required fields: title, director, rating'});
        }

        const { id } = req.params;
        const result = await Movie.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Movie Not Found.'});
        } else {
            return res.status(200).send({ message: 'Movie updated successfully.'})
        }


    } catch (err) {
        console.log(err);
        return res.status(400).send({message: err.message});
    }
})

// Delete a movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Movie.findByIdAndDelete(id)

        if (!result) {
            return res.status(404).json({ message: 'Movie not found.'})
        }

        return res.status(200).send({ message: 'Movie deleted successfully.'});

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message});
    }
}) 

export default router;