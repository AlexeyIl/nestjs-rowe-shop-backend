import { Document } from 'mongoose';
import { CartItemInterface } from './cart-item.interfaces';

export interface NoLoggedUserDB extends Document {
    readonly token: string,
    readonly date: string,
    readonly favorites: [string],
    readonly cart: [CartItemInterface]
}

export interface NoLoggedUserInterface {
    token: string,
    date?: string,
    favorites?: [string],
    cart?: [CartItemInterface]
}