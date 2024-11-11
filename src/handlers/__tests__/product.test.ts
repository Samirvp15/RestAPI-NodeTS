import request from 'supertest'
import server from '../../server'

describe('POST /api/products', ()=>{

    test('should create a new product', async ()=>{
        const response = await request(server).post('/api/products').send({
            name: "Holiii",
            price: 5
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty('data')
    })


})