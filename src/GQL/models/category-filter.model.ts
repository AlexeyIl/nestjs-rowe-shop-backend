import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class CategoryFilterGQL {
    @Field(type => [String], {nullable: true})
    sae: [string];

    @Field(type => [Float], {nullable: true})
    pack: [number];
}