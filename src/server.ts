import express from 'express'
import router from './router';
import db from './config/db';


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

server.get('/api', (req,res)=>{
    res.json({mgs: 'Desde API'})
})


export default server;

