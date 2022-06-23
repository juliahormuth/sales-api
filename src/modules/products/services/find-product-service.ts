import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../typeorm/entities/Product'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  id: string
}

export default class FindProductService {
  public async execute(request: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository)

    const result = await productsRepository.findOne(request.id)

    if (!result) {
      throw new AppError('Product not found')
    }
    return result
  }
}
