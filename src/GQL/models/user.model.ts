import { ObjectType, Field, ArgsType } from "@nestjs/graphql";
import { OrderGQL } from './order.model';
import { CartItemGQL, CartItemARGS } from './cart-item.model';
import { CartItemInterface } from "../../users/interfaces/cart-item.interfaces";


@ObjectType()
export class UserGQL {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    date: string

    @Field()
    phone: string

    @Field(type => [String], {nullable: 'items'})
    favorites: [string]

    @Field(type => [OrderGQL], {nullable: 'itemsAndList'})
    orders: [OrderGQL]

    @Field(type => [CartItemGQL], {nullable: 'itemsAndList'})
    cart: [CartItemInterface]

    @Field({nullable: true})
    _id: string

    @Field({nullable: true})
    adress: string

}

@ObjectType()
export class TokenGQL {
    @Field()
    access_token: string

    @Field()
    name: string

    @Field()
    email: string 

    @Field()
    phone: string

    @Field(types => [String])
    favorites: [string]
}

@ArgsType()
export class AddUserARGS {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    phone: string

    @Field(type => [CartItemARGS], {nullable: 'itemsAndList'})
    cart?: [CartItemInterface];

    @Field(type => [String], {nullable: 'items'})
    favorites: [string]
}

@ArgsType()
export class LoginUserARGS {
    @Field()
    email: string

    @Field()
    password: string
}


interface TokenInterface {
    access_token: string
}

@ObjectType()
export class LoggedUserCartGQL {
    @Field(type => String)
    email: string;

    @Field(type => [CartItemGQL], {nullable: 'itemsAndList'})
    cart?: [CartItemInterface];
}

@ArgsType()
export class LoggedUserCartARGS {
    @Field(type => [CartItemARGS], {nullable: 'itemsAndList'})
    cart?: [CartItemInterface];
}

@ArgsType()
export class EmailTokenGQL {
    @Field()
    emailToken: string
}

@ArgsType()
export class EmailArgGQL {
    @Field()
    email: string
}

@ArgsType()
export class RecoveryTokenGQL{
    @Field()
    token: string
}

@ArgsType()
export class NewPassRecoveryGQL {
    @Field()
    password: string

    @Field()
    token: string
}

@ArgsType()
export class UpdateUserArgsGQL {
    @Field({nullable: true})
    email: string

    @Field({nullable: true})
    name: string
    
    @Field({nullable: true})
    phone: string

    @Field({nullable: true})
    adress: string

    @Field({nullable: true})
    password: string
}

@ArgsType()
export class UpdateUserFavoritesArgsGQL {
    @Field(type => [String], {nullable: 'items'})
    codes: [string]
}