import * as mongoose from 'mongoose';
import { ProductSchema } from '../../catalog/schemas/product.schema';

export const OrderSchema = new mongoose.Schema({
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