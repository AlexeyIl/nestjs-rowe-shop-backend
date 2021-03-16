import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class SearchNameGQL {
    @Field()
    name: string;

    @Field()
    code: string;

    @Field(type => Float)
    price: number;
}