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
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
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

    const existentProductsIds = existentProducts.map(products => products.id) //[1, 2, 3..]

    const checkInexistentProductIds = products.filter(
      product => !existentProductsIds.includes(product.id) //verifica se os ids que buscamos estao todos entre os ids existentes
    )

    if (checkInexistentProductIds.length) {
      throw new AppError(`could not find product: ${checkInexistentProductIds[0].id}`)
    }

    const findProductsWithoutQuantity = products.filter(
      product =>
      existentProducts.filter(p => p.id === product.id)[0].quantity < product.quantity//se a quantidade que pedimos esse produto for menor do q a quantidade q temos da erro
    )//retorna os produtos invalidos
      console.log(findProductsWithoutQuantity)
    if(findProductsWithoutQuantity.length) {
      throw new AppError(`the quantity ${findProductsWithoutQuantity[0].quantity} is not available for ${findProductsWithoutQuantity[0].id}`)
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(p => p.id === product.id)[0].price
    }))

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializedProducts
    })

    //diminuir a quantidade de produtos em estoque
    const { order_products } = order

    const orderedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existentProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }))

    await this.productsRepository.updateQuantity(orderedProductsQuantity)

    return order

  }
}

export default CreateOrderService;
