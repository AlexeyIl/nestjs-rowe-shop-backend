import { GetSampledCodesARGS } from './../models/filter.args';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductGQL } from '../../GQL/models/product.gql.model';
import { CatalogService } from '../../catalog/services/catalog.service';
import { ProductInterface } from '../../catalog/interfaces/product.interface';
import { FilterModel } from "src/catalog/models/filter.model";
import { GetFilterARGS } from '../models/filter.args';
import { SortModel } from 'src/catalog/models/sort.model';
import { SearchNameGQL } from '../models/search-name.gql.model';
import { CategoryFilterInterface } from '../../catalog/models/filter.model';
import { CategoryFilterGQL } from '../models/category-filter.model';


@Resolver()
export class CatalogResolver {
    constructor(
        private catalog: CatalogService
    ) {

    }

    @Query(returns => [ProductGQL])
    async getCatalog(
        @Args() filterSettings?: GetFilterARGS,
        ): Promise<ProductInterface[]> {
            return await this.catalog.getCatalog(new FilterModel(filterSettings), new SortModel(filterSettings))
        }

    @Query(returns => [SearchNameGQL])
    async getSearchList(
        @Args('input')input: string,
        @Args('length', {nullable: true})length: number
    ) {
        return this.catalog.nameListSearch(input, length)
    }

    @Query(returns => CategoryFilterGQL)
    async getFilterList(
        @Args('category', {nullable: true})category: string
    ): Promise<CategoryFilterInterface> {
        return await this.catalog.getFilterList(category)
    }

    @Query(returns => [ProductGQL])
    async getCatalogSampledCodes(
        @Args()input: GetSampledCodesARGS
    ): Promise<ProductInterface[]> {
        return await this.catalog.getCatlogSampledCodes(input.codes);
    }

}