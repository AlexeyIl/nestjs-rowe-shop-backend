import { ObjectType, Field, ArgsType} from '@nestjs/graphql';
import { CartItemGQL, CartItemARGS } from './cart-item.model';
import { CartItemInterface } from 'src/users/interfaces/cart-item.interfaces';

@ObjectType()
export class OrderGQL {
    @Field({nullable: true})
    date?: string

    @Field()
    name: string

    @Field()
    phone: string

    @Field()
    delivery: string

    @Field({nullable: true})
    adress?: string

    @Field(type => [CartItemGQL])
    cart: [CartItemInterface]

    @Field()
    number?: number

    @Field()
    mail: string

    @Field()
    personal: boolean

    @Field()
    payment: string
}

@ArgsType()
export class OrderARGS {
    @Field()
    name: string

    @Field()
    phone: string

    @Field()
    delivery: string

    @Field({nullable: true})
    adress?: string

    @Field(type => [CartItemARGS])
    cart: [CartItemInterface]

    @Field()
    mail: string

    @Field()
    personal: boolean

    @Field()
    payment: string
}

@ArgsType()
export class OrderTokenARGS {
    @Field({nullable: true})
    number: number
}