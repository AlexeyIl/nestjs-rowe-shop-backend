import { Field, ID, Int, Float, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class ProductGQL {
    @Field(type => Int, {nullable: true})
    ABC: number;
    
    @Field(type => ID)
    code: string;

    @Field(type => Float)
    pack: number;

    @Field(type => Int, {nullable: true})
    box: number;

    @Field(type => Float, {nullable: true})
    weight: number;

    @Field(type => Float)
    price: number;

    @Field()
    category: string;

    @Field()
    group: string;

    @Field()
    name: string;

    @Field()
    discription: string;

    @Field({nullable: true})
    pass?: string;

    @Field({nullable: true})
    tech?: string;

    @Field({nullable: true})
    img?: string;

    @Field({nullable: true})
    sae?: string;

    @Field({nullable: true})
    fullDiscription?: string;

    @Field({nullable: true})
    using?: string | null;

    @Field({nullable: true})
    benefits?: string | null;

    @Field({nullable: true})
    recomendation?: string | null;

    @Field({nullable: true})
    instructions?: string | null;
    
    @Field({nullable: true})
    quantity?: string | null;

    @Field((type) => [String], {nullable: 'itemsAndList'})
    approvs?: [string];

    @Field((type) => [String], {nullable: 'itemsAndList'})
    approvsEqual?: string[];

    @Field((type) => [String], {nullable: 'itemsAndList'})
    approvsRecomendation?: string[]

}

@InputType()
export class ProductARGS {
    @Field(type => ID, {nullable: true})
    code: string;

    @Field(type => Float, {nullable: true})
    pack: number;

    @Field(type => Float, {nullable: true})
    price: number;

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    img: string;
}