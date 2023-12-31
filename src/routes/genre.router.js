const { getAll, create, getOne, remove, update } = require('../controllers/genre.controllors');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route('/')
    .get(getAll)
    .post(create);

genreRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = genreRouter;