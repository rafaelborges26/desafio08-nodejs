import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    private ordersRepository: IOrdersRepository,
    private productsRepository: IProductsRepository,
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {

    const customerExists = await this.customersRepository.findById(customer_id)

    if(!customerExists) {
      throw new AppError('Customer not exists')
    }

    const existentProducts = await this.productsRepository.findAllById(products)

    if(!existentProducts.length) {
      throw new AppError('Could not fiund any products')
    }

    //const order = this.ordersRepository.create({
    //  customer_id,
    //  products:
    //})


  }
}

export default CreateOrderService;
