const request = require('supertest');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const app = require('../app');
require('../models')

let id;
test('GET debe traer todas las películas', async () => {
    const res = await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
});
test('POST debe crear una película', async () => {
    const newMovie = {
        name: 'El señor de los anillos',
        image: 'http:/www.image.com',
        synopsis: 'En retorno del rey',
        releaseYear: 2001,
    }
    const res = await request(app).post('/movies').send(newMovie)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(newMovie.name)
    expect(res.body.id).toBeDefined()
});
test('PUT /movies/:id debe actualizar una película', async () => {
    const updateMovie = {
        name: 'El señor de los anillos actualizado',
    }
    const res = await request(app).put(`/movies/${id}`).send(updateMovie)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(updateMovie.name)
});
test('POST /movies/:id/actors debe agregar un actor a una película', async () => {
    const actor = await Actor.create({
        firstName: 'Adam' ,
        lastName: 'Sandler',
        nationality: 'Norte América',
        image:'http://www.image.com' ,
        birthday: '01/01/1990',
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});
test('POST /movies/:id/directors debe agregar un director a una película', async () => {
    const director = await Director.create({
        firstName: 'Adam' ,
        lastName: 'McDonald',
        nationality: 'Norte América',
        image:'http://www.image.com' ,
        birthday: '01/01/1990',
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});
test('POST /movies/:id/genres debe agregar un género a una película', async () => {
    const genre = await Genre.create({
        name: 'Acción'
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('DELEtE /movies/:id debe eliminar una película', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
});