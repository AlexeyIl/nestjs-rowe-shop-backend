import * as mongoose from 'mongoose';
import { ProductSchema } from '../../catalog/schemas/product.schema';

export const NoLoggedUserSchema = new mongoose.Schema({
    token: String,
    date: Date,
    favorites: [String],
    cart: [{
        count: Number,
        product: ProductSchema
    }]   
});