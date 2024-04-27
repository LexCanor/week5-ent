require('../models')

const request = require("supertest")
const app = require('../app')

const URL_BASE = '/api/v1/directors'
const director = {
    firstName: "David",
    lastName: "Castillo",
    nationality: "Perú",
    image: "ramdontext",
    birthday: "1990-01-01"
}
const bodyUpdate = { firstName: "Hector"}

let directorId

test("Post -> URL_BASE, should return statusCode 201, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .post(URL_BASE)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("Get -> URL_BASE, should return statusCode 200, and res.body.length === 1", async() => {
    const res = await request(app)
        .get(URL_BASE)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("Get -> URL_BASE/:id, should return statusCode 200, and res.body.firstName === director.firstName", async() => {
    const res = await request(app)
        .get(`${URL_BASE}/${directorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("Put -> URL_BASE/:id, should return statusCode 200, and res.body.firstName === bodyUpdate.firstName", async() => {
    const res = await request(app) 
        .put(`${URL_BASE}/${directorId}`) 
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
})

test("Delete -> URL_BASE/directorId, should return statusCode 204", async() => {
    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)

    expect(res.statusCode).toBe(204)
})