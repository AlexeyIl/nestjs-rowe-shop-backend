import { Document } from 'mongoose';

export interface OilChooseInterfaceDB extends Document {
    name: string,
    phone: string,
    carBrand: string,
    carModel: string,
    year: string,
    engine: string,
    transmission: string
    date?: string
}

export interface OilChooseInterface {
    name: string,
    phone: string,
    carBrand: string,
    carModel: string,
    year: string,
    engine: string,
    transmission: string
    date?: string
}