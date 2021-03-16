import { UserOrderInterface, OrderInterface } from './../interfaces/order.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDB } from 'src/users/interfaces/order.interface';
import { UserOrderDB } from '../interfaces/order.interface';
@Injectable()
export class OrderDbService {
    constructor(
        @InjectModel('Orders') private readonly OrderModel: Model<OrderDB>,
        @InjectModel('UserOrders') private readonly UserOrderModel: Model<UserOrderDB>
    ) {}

    async addOrder(order: OrderInterface): Promise<OrderDB> {        
        const createOrder = new this.OrderModel(order);
        return createOrder.save()
    }

    async addUserOrder(order: UserOrderInterface): Promise<UserOrderDB> {
        const createOrder = new this.UserOrderModel(order)
        return createOrder.save()
    }

    async getOrderByNumber(number: number): Promise<UserOrderDB> {
        return this.UserOrderModel.findOne({number}).exec()
    }

    async getAllOrderById(id: string): Promise<UserOrderDB[]> {
        return this.UserOrderModel.find({userId: id}).sort({date: -1}).exec()
    }

    async getOrderById(userId: string, orderId: number): Promise<UserOrderDB> {
        return this.UserOrderModel.findOne({userId, number: orderId}).exec()
    }

}