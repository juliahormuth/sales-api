import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}

export default class UpdateProductService {
  public async execute(request: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findOne(request.id)

    if (!product) {
      throw new AppError('Product not found')
    }

    const productExists = await productsRepository.findByName(request.name)

    if (productExists && request.name !== product.name) {
      throw new AppError('There is already one product with this name')
    }

    product.name = request.name
    product.price = request.price
    product.quantity = request.quantity

    return await productsRepository.save(product)
  }
}
