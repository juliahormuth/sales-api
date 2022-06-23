import { Request, Response } from 'express'
import CreateProductService from '../services/create-product-service'
import DeleteProductService from '../services/delete-product-service'
import FindProductService from '../services/find-product-service'
import ListProductService from '../services/list-product-service'
import UpdateProductService from '../services/update-product-service'

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService()

    const result = await listProducts.execute()

    return response.json(result)
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const findProduct = new FindProductService()
    const result = await findProduct.execute({ id })

    return response.json(result)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body

    const createProduct = new CreateProductService()

    const result = await createProduct.execute({ name, price, quantity })
    return response.json(result)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const { id } = request.params

    const updateProduct = new UpdateProductService()

    const result = await updateProduct.execute({ id, name, price, quantity })
    return response.json(result)
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteProduct = new DeleteProductService()

    await deleteProduct.execute({ id })
    return response.json({ message: 'product deleted successfully' })
  }
}
