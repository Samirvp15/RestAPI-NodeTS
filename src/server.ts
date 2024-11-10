import express from 'express'
import router from './router';
import db from './config/db';


//Conectar a db
async function connectDB() {

    try {
        await db.authenticate()
        db.sync()
        console.log('conexion a db exitosa')
    } catch (error) {
        console.log(error)
    }

}
connectDB()


const server = express()

server.use(express.json())
server.use('/api/products', router)


export default server;

