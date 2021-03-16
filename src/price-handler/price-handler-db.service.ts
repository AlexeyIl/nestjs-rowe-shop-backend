import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductDB } from '../catalog/interfaces/productDB.interface';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class PriceHandlerDbService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<ProductDB>,
    ) {}

    async updateQuantityByCode(code: string, quantity: number): Promise<ProductDB>{
        return await this.productModel.findOneAndUpdate({code},{quantity},{new: false}).exec()
    }
}
