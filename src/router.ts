
import { Router } from 'express'
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from './handlers/product'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middlewares'


const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:   
 *          type: object
 *          properties: 
 *              id: 
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name: 
 *                  type: string
 *                  description: The product name
 *                  example: Local-TV-Samsung
 *              price: 
 *                  type: number
 *                  description: The product price
 *                  example: 350
 *              availability: 
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 * 
 */



/**
 * 
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *          - Products
 *        description: Return a list of products
 *        responses: 
 *              200: 
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 */
router.get('/', getProducts)



/**
 * 
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *      -   in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *          200: 
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById)


/**
 * 
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Samsung -25"
 *                          price:
 *                              type: number
 *                              example: 250
 *      responses:
 *          201:
 *              description: Product created Successfully
 *          content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid Input Data
 * 
 * 
 */

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


/**
 * 
 * @swagger
 * /api/products/{id}:
 *  put: 
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns updated product
 *      parameters:
 *      -   in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Samsung -25"
 *                          price:
 *                              type: number
 *                              example: 250
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product Not Found
 *          400:
 *              description: Bad Request - Invalid Input Data - Invalid ID
 *  */ 




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


/**
* @swagger
* /api/products/{id}:
*   patch:
*      summary: Updates product availability
*      tags:
*          - Products
*      description: Returns the updated availability
*      parameters: 
*          - in: path
*            name: id
*            description: The ID of the product to retrieve
*            required: true
*            schema:
*               type: integer
*      responses:
*           200:
*               description: Successful response
*               content:
*                   application/json:
*                       schema:
*                           items:
*                               $ref: '#/components/schemas/Product'
*           404:
*               description: Product Not Found
*           400:
*              description: Bad Request - Invalid Input Data - Invalid ID
* 
* 
* 
 *  */ 
router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability)



/**
* 
* @swagger
* /api/products/{id}:
*   delete:
*      summary: Delete product with ID
*      tags:
*          - Products
*      description: Returns deleted product message
*      parameters: 
*          - in: path
*            name: id
*            description: The ID of the product to delete
*            required: true
*            schema:
*               type: integer
*      responses:
*           200:
*               description: Successful response
*               content:
*                   application/json:
*                       schema:
*                           items:
*                               $ref: '#/components/schemas/Product'
*           404:
*               description: Product Not Found
*           400:
*              description: Bad Request - Invalid Input Data - Invalid ID
* 
 * 
 * 
 */
router.delete('/:id', param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)


export default router



