import express from 'express'
import router from './router';
import swaggerUi  from 'swagger-ui-express';
import db from './config/db';
import swaggerSpec from './config/swagger';


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


server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


export default server;

