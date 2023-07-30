const request = require('supertest');
const app = require('../app');
const e = require('express');
let id;
test('GET  debe traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})
test('POST debe crear un actor', async () => {
    const newActor = {
        firstName: 'Adam' ,
        lastName: 'Sandler',
        nationality: 'Norte América',
        image:'http://www.image.com' ,
        birthday: '01/01/1990',
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
    expect(res.body.id).toBeDefined();
})
test('PUT /actors/:id debe actualizar un actor', async () => {
    const updateActor = {
        firstName: 'Adam actualizado' ,
    }
    const res = await request(app).put(`/actors/${id}`).send(updateActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateActor.firstName);
})

test('DELETE /actors/:id debe borrar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
})