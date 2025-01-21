import request from 'supertest'
import server from '../../server'
import {describe, expect, test} from '@jest/globals';

describe('POST /api/products', () => {


    test('should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')

    })

    test('should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Holiii",
            price: 5
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
    })



    test('should validate price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Holiii",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.status).not.toBe(404)

    })


})


describe('GET /api/products', () => {

    test('should check if api/products url exists', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).not.toBe(404)

    })

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(404)

    })

})


describe('GET /api/products/:id', () => {

    test('should return a 404 response for a non-exist product', async () => {
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')

    })

    test('should check a valid URL', async () => {

        const response = await request(server).get(`/api/products/not-valid-url`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })


    test('get a JSON response for a single product', async () => {

        const response = await request(server).get(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')


    })

})


describe('PUT /api/products/:id', () => {

    test('should display validation error messages when updating a product', async () => {

        const response = await request(server).put(`/api/products/1`).send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()

    })

    test('should validate price product greater than 0', async () => {

        const response = await request(server).
            put(`/api/products/1`).
            send({
                name: "Alex",
                price: -30,
                availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')

    })


    test('should check a valid ID in the url', async () => {

        const response = await request(server).
            put(`/api/products/not-valid-url`).
            send({
                name: "Alex",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })

    test('should return a 404 response for product not found', async () => {

        const id = 800
        const response = await request(server).
            put(`/api/products/${id}`).
            send({
                name: "Alex",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    test('should update product with valid data', async () => {

        const response = await request(server).
            put(`/api/products/1`).
            send({
                name: "Alex",
                price: 300,
                availability: true
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')

    })


})


describe('DELETE /api/products/:id', () => {

    test('should check valid ID', async () => {

        const response = await request(server).delete(`/api/products/nvu`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')

    })

    test('should return a 404 response for product not found', async ()=>{

        const response = await request(server).delete(`/api/products/2000`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
    })

    test('should delete a product', async ()=>{

        const response = await request(server).delete(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })

})




