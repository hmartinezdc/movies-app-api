const request = require('supertest')
const app = require('../app')
let id;
test('GET debe traer todos los directores', async () => {
    const res = await request(app).get('/directors')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});
test('CREATE debe crear un director', async () => {
    const newDirector = {
        firstName: 'Adam' ,
        lastName: 'McDonald',
        nationality: 'Norte América',
        image:'http://www.image.com' ,
        birthday: '01/01/1990',
    }
    const res = await request(app).post('/directors').send(newDirector)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(newDirector.firstName)
    expect(res.body.id).toBeDefined()
});
test('UPDATE /director/:id debe actualizar un director', async () => {
    const updateDirector = {
        firstName: 'Adam actualizado' 
    }
    const res = await request(app).put(`/directors/${id}`).send(updateDirector)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(updateDirector.firstName)
});
;
test('DELETE /director/:id debe eliminar un director', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204)
});
