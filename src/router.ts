

import {Router} from 'express'


const router = Router()

router.get('/', (req,res)=>{
    res.json('Hola mundoo xd')
})

router.post('/', (req,res)=>{
    res.json('Hola POST')
})

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



