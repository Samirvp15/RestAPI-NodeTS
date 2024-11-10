
import { Router } from 'express'
import { createProduct } from './handlers/product'
import { body } from 'express-validator'
import { handleInputErrors } from './middlewares'


const router = Router()

router.get('/', (req, res) => {
    res.json('Hola mundoo xd')
})

router.post('/',

    //Validacion
    body('price').
        isNumeric().withMessage('Valor no valido').
        isFloat().withMessage('Valor no flotante').
        notEmpty().withMessage('Precio no puede ser vacio').
        custom(value => value > 0).withMessage('Precio no valido'),

    body('name').
        notEmpty().withMessage('Nombre no puede ser vacio'),
    //Middleware
    handleInputErrors,
    createProduct)

router.put('/', (req, res) => {
    res.json('Hola PUT')
})

router.patch('/', (req, res) => {
    res.json('Hola PATCH')
})

router.delete('/', (req, res) => {
    res.json('Hola DELETE')
})


export default router



