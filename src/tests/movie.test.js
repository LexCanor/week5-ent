require('../models')

const request = require("supertest")
const app = require('../app')

const URL_BASE = '/api/v1/movies'
const movie = {
    name: "101 Dalmatas",
    image: "ramdontext",
    synopsis: "lorem20",
    releaseYear: "1999-09-11"
}
const bodyUpdate = { name: "Tarzan"}

let movieId

test("Post -> URL_BASE, should return statusCode 201, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .post(URL_BASE)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Get -> URL_BASE, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(URL_BASE)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> URL_BASE/:id, should return statusCode 200, and res.body.name === movie.name", async() => {
    const res = await request(app)
        .get(`${URL_BASE}/${movieId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Put -> URL_BASE/:id, should return statusCode 200, and res.body.name === bodyUpdate.name", async() => {
    const res = await request(app) 
        .put(`${URL_BASE}/${movieId}`) 
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

test("Delete -> URL_BASE/movieId, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

    expect(res.statusCode).toBe(204)
})