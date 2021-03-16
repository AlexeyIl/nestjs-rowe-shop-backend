import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrderGQL, OrderARGS, OrderTokenARGS } from '../models/order.model';
import { OrderService } from '../../users/services/order.service';
import { GqlAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UserFromTokenInterface } from '../../auth/auth.interface';
import { CurrentUser } from '../user.decorator';


@Resolver()
export class OrderResolver {
    constructor(
        private orderService: OrderService
    ) {}

    @Mutation(returns => OrderGQL)
    async addOrder(
        @Args()order: OrderARGS
    ) {
        return this.orderService.addOrder(order)
    }

    @Mutation(returns => OrderGQL)
    @UseGuards(GqlAuthGuard)
    async addUserOrder(
        @Args()order: OrderARGS,
        @CurrentUser()user: UserFromTokenInterface
    ) {
        return this.orderService.addUserOrder(order, user.userId)
    }

    @Query(returns => [OrderGQL])
    @UseGuards(GqlAuthGuard)
    async getUserOrdersList(
        @CurrentUser()user: UserFromTokenInterface,
    ) {
        return this.orderService.getAllUserOrders(user.userId)
    }

    @Query(returns => OrderGQL)
    @UseGuards(GqlAuthGuard)
    async getUserOrder(
        @CurrentUser()user: UserFromTokenInterface,
        @Args()args: OrderTokenARGS
    ) {
        return this.orderService.getUserOrder(user.userId, args.number)
    }
}