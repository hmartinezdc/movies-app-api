const request = require('supertest')
const app = require('../app')
let id;
test('GET debe traer todos los géneros', async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});
test('POST debe crear un género', async () => {
    const newGenre = {
        name: 'Rock'
    }
    const res = await request(app).post('/genres').send(newGenre);
    id = res.body.id;
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
    expect(res.body.id).toBeDefined();
});
test('UPDATE /genres/:id debe actualizar un género', async () => {
    const updateGenre = {
        name: 'Rock actualizado'
    }
    const res = await request(app).put(`/genres/${id}`).send(updateGenre);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updateGenre.name);
});
test('DELETE /genres/:id debe borrar un género', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.statusCode).toBe(204);
});