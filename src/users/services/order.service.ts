import { Injectable } from '@nestjs/common';
import { MailService } from '../../mail/services/mail.service';
import { OrderDB, UserOrderDB } from 'src/users/interfaces/order.interface';
import { OrderDbService } from './order-db.service';
import { OrderGQL } from '../../GQL/models/order.model';
import { UserService } from './user.service';

@Injectable()
export class OrderService {

    constructor(
        private mailService: MailService,
        private orderDBService: OrderDbService,
        private userService: UserService
    ) {
        
    }

    async addOrder(order: OrderGQL): Promise<OrderDB> {        
        const orderRes = await this.orderDBService.addOrder(Object.assign({date: new Date}, order, {number: await this.getNumber()}));
        this.mailService.sendToStore(orderRes);
        this.mailService.sendToClient(orderRes);
        return orderRes
    }

    async addUserOrder(order: OrderGQL, userId: string): Promise<OrderGQL> {
        const user = await this.userService.getUser(userId);
        if(user){
            const orderRes = await this.orderDBService.addUserOrder(Object.assign({date: new Date}, {userId}, order, {number: await this.getNumber()}));
            this.mailService.sendToStore(orderRes);
            this.mailService.sendToClient(orderRes); 
            return orderRes
        }
    }

    async getAllUserOrders(userId: string): Promise<UserOrderDB[] | null> {
        return this.orderDBService.getAllOrderById(userId)
    }

    async getUserOrder(userId: string, orderId: number): Promise<UserOrderDB | null> {
        return this.orderDBService.getOrderById(userId, orderId)
    }

    private async getNumber() {
        const n = Math.floor(Math.random()*1000000000);
        const order = await this.orderDBService.getOrderByNumber(n);
        if(order){
            return this.getNumber()
        } else {
            return n
        }
    }

}
