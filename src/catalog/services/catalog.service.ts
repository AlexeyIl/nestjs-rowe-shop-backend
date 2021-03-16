import { Injectable } from '@nestjs/common';
import { CatalogDBService } from './catalog.DBservice';
import { ProductInterface } from '../interfaces/product.interface';
import { FilterModel, FilterListInteface, CategoryFilterInterface } from '../models/filter.model';
import { SortModel } from '../models/sort.model';
import { from, Observable } from 'rxjs';
import { filter, take, toArray } from 'rxjs/operators'

@Injectable()
export class CatalogService {
    nameList: NameListInterface[] = [];
    filterList: FilterListInteface = {};

    constructor(
        private catalogDBService: CatalogDBService
    ) {
        this.start().then(() => console.log(`${new Date()} name list and filter list ready`))
    }

    async getCatalog(filterSettings?: FilterModel, sortSettings?: SortModel): Promise<ProductInterface[]>{
        return this.catalogDBService.getCatalog(filterSettings.getFilter, sortSettings.getSortString)
    }

    async getCatlogSampledCodes(codes: string[]): Promise<ProductInterface[]> {
        return this.catalogDBService.getCatalogSampledCodes(codes)
    }

    private async getSearchNameListFromDB(): Promise<NameListInterface[]> {
        return this.catalogDBService.getSearchNameList()
    }
    
    private async getFilterListFromDB(): Promise<FilterListInteface[]> {
        return this.catalogDBService.getFilterList()
    }

    private async start() {
        this.nameList = await this.getSearchNameListFromDB();
        this.filterList = (await this.getFilterListFromDB())[0];
    }

    nameListSearch(req: string, takes = 5): Observable<NameListInterface[]>{
        return from(this.nameList).pipe(
            filter( vl => vl.name.toLowerCase().includes(req.toLowerCase())),
            take(takes > 0 ? takes : 1),
            toArray()
        )
    }

    async getFilterList(category: string): Promise<CategoryFilterInterface> {
        return this.filterList[category] ? this.filterList[category] : this.filterList.all
    }
}


export interface NameListInterface{
    name: string,
    price: number,
    code: string
}
