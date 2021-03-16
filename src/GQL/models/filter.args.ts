import { Field, ArgsType, Float } from '@nestjs/graphql';

@ArgsType()
export class GetFilterARGS {
    @Field({nullable: true})
    ABC?: number;

    @Field({nullable: true})
    code?: string;
    
    @Field((type) => [Float], {nullable: 'itemsAndList'})
    pack?: [number];

    @Field((type) => [String], {nullable: 'itemsAndList'})
    category?: [string];

    @Field({nullable: true})
    group?: string;

    @Field({nullable: true})
    name?: string;

    @Field((type) => [String], {nullable: 'itemsAndList'})
    sae?: [string];   

    @Field({nullable: true, defaultValue: 'quantity'})
    sortPoll?: string

    @Field({nullable: true, defaultValue: false})
    descending: boolean 
}

@ArgsType()
export class GetSampledCodesARGS {
    @Field((type) => [String], {nullable: true})
    codes: [string];
}
