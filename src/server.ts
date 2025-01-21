import express from 'express'
import router from './router';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan'
import db from './config/db';
import swaggerSpec from './config/swagger';
import cors, { CorsOptions } from 'cors';


//Conectar a db
async function connectDB() {

    try {
        await db.authenticate()
        console.log("Conexión exitosa con la base de datos.");
        db.sync()
    } catch (error) {
        console.log(error)
    }

}
connectDB()


const server = express()
server.use(express.json())

const allowedOrigins = [process.env.FRONTEND_URL, process.env.BACKEND_URL];
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors())

server.use(morgan('dev'))


server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server;

