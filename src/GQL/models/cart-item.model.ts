import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { ProductGQL, ProductARGS } from './product.gql.model';
import { ProductInterface } from 'src/catalog/interfaces/product.interface';

@ObjectType()
export class CartItemGQL {
    @Field(type => Int)
    count: number;

    @Field(type => ProductGQL)
    product: ProductInterface
}

@InputType()
export class CartItemARGS {
    @Field(type => Int)
    count?: number;

    @Field(type => ProductARGS)
    product?: ProductInterface
}