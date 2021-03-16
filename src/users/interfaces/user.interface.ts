import { Document } from 'mongoose';
import { OrderDB } from './order.interface';
import { CartItemInterface } from '../interfaces/cart-item.interfaces';
import { EmailTokenInterface } from './email-token.interface';
import { PasswordRecoveryInterface } from './password-recovery.interface';

export interface UserDB extends Document {
    name: string,
    date: string,
    email: string,
    password: string,
    phone: string,
    orders: [OrderDB],
    group: string,
    cart: [CartItemInterface],
    emailToken: EmailTokenInterface,
    emailVerified: boolean,
    passwordRecovery: PasswordRecoveryInterface
    adress: string,
    favorites: [string]
}


export interface UserInterface {
    name?: string,
    date?: string,
    email: string,
    phone?: string,
    password: string,
    orders?: [OrderDB],
    group?: string,
    _id?: string,
    cart?: [CartItemInterface],
    emailToken?: EmailTokenInterface,
    emailVerified?: boolean,
    passwordRecovery?: PasswordRecoveryInterface,
    adress?: string,
    favorites?: [string]
}

