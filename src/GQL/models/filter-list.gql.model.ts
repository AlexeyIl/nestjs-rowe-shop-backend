import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryFilterGQL } from './category-filter.model';
import { CategoryFilterInterface } from '../../catalog/models/filter.model';

@ObjectType()
export class FilterListGQL {
    @Field(type => CategoryFilterGQL, {nullable: true})
    all: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    auto: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    moto: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    transmission: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    commercial: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    agriculture: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    antifreeze: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    grease: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    brake: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    industrial: CategoryFilterInterface;

    @Field(type => CategoryFilterGQL, {nullable: true})
    marine: CategoryFilterInterface;

}