import { Document } from 'mongoose';

export interface WholesaleRequestInterfaceDB extends Document {
    name: string,
    company: string,
    inn: string,
    email: string,
    phone: string,
    date?: string
}

export interface WholesaleRequestInterface {
    name: string,
    company: string,
    inn: string,
    email: string,
    phone: string,
    date?: string
}