import * as mongoose from 'mongoose';
import { OrderSchema } from './order.schema'
import { ProductSchema } from '../../catalog/schemas/product.schema';

export const UserSchema = new mongoose.Schema({
    name: String,
    date: Date,
    email: String,
    password: String,
    phone: String,
    orders: [OrderSchema],
    group: String,
    cart: [{
        count: Number,
        product: ProductSchema
    }],
    emailToken: {
        token: String,
        date: Date
    },
    emailVerified: Boolean,
    passwordRecovery: {
        token: String,
        date: Date
    },
    adress: String,
    favorites: [String]
});