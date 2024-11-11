
import { Router } from 'express'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middlewares'


const router = Router()

router.get('/', getProducts)

router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)

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

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    //Validacion
    body('price').
        isNumeric().withMessage('Valor no valido').
        isFloat().withMessage('Valor no flotante').
        notEmpty().withMessage('Precio no puede ser vacio').
        custom(value => value > 0).withMessage('Precio no valido'),
    body('name').
        notEmpty().withMessage('Nombre no puede ser vacio'),
    body('availability').
        isBoolean().withMessage('Valor no valido'),
    //Middleware
    handleInputErrors,
    updateProduct)

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)

router.delete('/:id', param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)


export default router



