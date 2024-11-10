import { Request, Response } from 'express'
import Product from '../models/Product.model'



export const getProducts = async (req: Request, res: Response) => {

    try {
        const product = await Product.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        })
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }

}

export const getProductById = async (req: Request, res: Response): Promise<any> => {

    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }

}





export const createProduct = async (req: Request, res: Response) => {

    try {
        const product = await Product.create(req.body)
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }

}