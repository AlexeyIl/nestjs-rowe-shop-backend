import { Document } from 'mongoose';

export interface CallRequestInterfaceDB extends Document {
    name: string,
    phone: string,
    date?: string
}

export interface CallRequestInterface {
    name: string,
    phone: string,
    date?: string
}