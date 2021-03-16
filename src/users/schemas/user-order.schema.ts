import * as mongoose from 'mongoose';
import { ProductSchema } from '../../catalog/schemas/product.schema';

export const UserOrderSchema = new mongoose.Schema({
    userId: String,
    number: Number,
    date: Date,
    name: String,
    phone: String,
    delivery: String,
    adress: String,
    mail: String,
    personal: Boolean,
    payment: String,
    cart: [{
        count: Number,
        product: ProductSchema
    }]   
});