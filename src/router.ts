

import {Router} from 'express'
import { createProduct } from './handlers/product'


const router = Router()

router.get('/', (req,res)=>{
    res.json('Hola mundoo xd')
})

router.post('/', createProduct)

router.put('/', (req,res)=>{
    res.json('Hola PUT')
})

router.patch('/', (req,res)=>{
    res.json('Hola PATCH')
})

router.delete('/', (req,res)=>{
    res.json('Hola DELETE')
})


export default router



