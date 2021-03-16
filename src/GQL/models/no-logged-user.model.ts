import { ObjectType, Field, ArgsType } from '@nestjs/graphql';
import { CartItemGQL, CartItemARGS } from './cart-item.model';
import { CartItemInterface } from 'src/users/interfaces/cart-item.interfaces';

@ObjectType()
export class NoLoggedUserGQL {
    @Field(type => String)
    token: string;

    @Field(type => [String], {nullable: 'items'})
    favorites: string[];

    @Field(type => [CartItemGQL], {nullable: 'itemsAndList'})
    cart?: CartItemInterface[];
}

@ArgsType()
export class NoLoggedUserARGS {
    @Field(type => String)
    token: string;

    @Field(type => [CartItemARGS], {nullable: 'itemsAndList'})
    cart?: CartItemInterface[];
}

@ArgsType()
export class NoLoggedUserFavARGS {
    @Field(type => String)
    token: string;

    @Field(type => [String], {nullable: 'items'})
    favorites: string[];
}