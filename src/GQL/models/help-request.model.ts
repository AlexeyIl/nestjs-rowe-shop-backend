import { ArgsType, Field, ObjectType } from "@nestjs/graphql";

@ArgsType()
export class CallRequestARGS {
    @Field()
    name: string;

    @Field()
    phone: string;
}

@ObjectType()
export class CallRequestGQL {
    @Field()
    name: string;

    @Field()
    phone: string;

    @Field()
    date: string;
}

@ArgsType()
export class OilChooseRequestARGS {
    @Field()
    name: string
    
    @Field()
    phone: string

    @Field()
    carBrand: string;

    @Field()
    carModel: string;

    @Field()
    year: string;

    @Field()
    engine: string;
    
    @Field()
    transmission: string;
}

@ObjectType()
export class OilChooseRequestGQL {
    @Field()
    name: string
    
    @Field()
    phone: string

    @Field()
    carBrand: string;

    @Field()
    carModel: string;

    @Field()
    year: string;

    @Field()
    engine: string;
    
    @Field()
    transmission: string;

    @Field()
    date: string;
}

@ArgsType()
export class WholesaleRequestARGS {
    @Field()
    name: string;

    @Field()
    company: string;

    @Field()
    inn: string;

    @Field()
    email: string;

    @Field()
    phone: string;
}

@ObjectType()
export class WholesaleRequestGQL {
    @Field()
    name: string;
    
    @Field()
    company: string;
    
    @Field()
    inn: string;
    
    @Field()
    email: string;
    
    @Field()
    phone: string;

    @Field()
    date: string;
}