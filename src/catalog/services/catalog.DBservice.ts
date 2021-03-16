import { FilterListDB, FilterListInteface } from './../models/filter.model';
import { SearchNameListDB } from './../interfaces/searchNameList.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDB } from '../interfaces/productDB.interface';
import { FilterSettingsDBInterface } from '../models/filter.model';

@Injectable()
export class CatalogDBService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductDB>,
        @InjectModel('Search Name List') private readonly searchNameListModel: Model<SearchNameListDB>,
        @InjectModel('Filter List') private readonly filterListModel: Model<FilterListDB>

    ) {}

    async getCatalog(filter: FilterSettingsDBInterface, sortString: string): Promise<ProductDB[]> {
        return this.productModel.find(filter).sort(sortString).exec()
    }

    async getCatalogSampledCodes(codes: string[]): Promise<ProductDB[]> {
        return this.productModel.find({code: {$in: codes}}).exec()
    }

    async getSearchNameList(): Promise<SearchNameListDB[]> {
        return this.searchNameListModel.find().exec()
    }

    async getFilterList(): Promise<FilterListInteface[]> {
        return this.filterListModel.find().exec()
    }

    async uploadQuantity(code:string){
        console.log(code)
    }
}
