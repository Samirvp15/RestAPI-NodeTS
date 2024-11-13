import express from 'express'
import router from './router';
import swaggerUi  from 'swagger-ui-express';
import morgan from 'morgan'
import db from './config/db';
import swaggerSpec from './config/swagger';
import cors, { CorsOptions } from 'cors';


//Conectar a db
async function connectDB() {

    try {
        await db.authenticate()
        db.sync()
    } catch (error) {
        console.log(error)
    }

}
connectDB()


const server = express()
server.use(express.json())


const corsOptions: CorsOptions = {
    origin: function(origin, callback){
       if(origin === process.env.FRONTEND_URL){
        callback(null, true)
       }else{
        callback(new Error('Error de CORS'))
       }
    }
}

server.use(cors(corsOptions))

server.use(morgan('dev'))


server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server;

