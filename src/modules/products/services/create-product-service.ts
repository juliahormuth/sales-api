import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

export default class CreateProductService {
  public async execute(request: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const products = await productsRepository.findByName(request.name)

    if (products) {
      throw new AppError('There is already one product with this name')
    }

    const result = productsRepository.create(request)

    await productsRepository.save(result)

    return result
  }
}
