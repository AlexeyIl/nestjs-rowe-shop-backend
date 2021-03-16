import { Document } from 'mongoose';
import { CartItemInterface } from './cart-item.interfaces';

export interface OrderDB extends Document {
    readonly number?: number,
    readonly date?: string,
    readonly name: string,
    readonly phone: string,
    readonly delivery: string,
    readonly adress?: string,
    readonly cart: [CartItemInterface],
    readonly mail: string,
    readonly personal: boolean,
    readonly payment: string
}

export interface UserOrderDB extends OrderDB {
    readonly userId: string
}

export interface OrderInterface {
    readonly number?: number,
    readonly date?: string,
    readonly name: string,
    readonly phone: string,
    readonly delivery: string,
    readonly adress?: string,
    readonly cart: [CartItemInterface],
    readonly mail: string,
    readonly personal: boolean,
    readonly payment: string
}

export interface UserOrderInterface extends OrderInterface {
    readonly userId: string
}