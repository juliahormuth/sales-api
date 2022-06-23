import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/products-repository'

interface IRequest {
  id: string
}

export default class DeleteProductService {
  public async execute(request: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository)

    const product = await productsRepository.findOne(request.id)

    if (!product) {
      throw new AppError('Product not found')
    }

    await productsRepository.remove(product)
  }
}
