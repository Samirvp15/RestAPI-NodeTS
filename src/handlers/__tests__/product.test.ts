import request from 'supertest'
import server from '../../server'

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