import { Document } from 'mongoose';

export interface SearchNameListDB extends Document {
    readonly name: string;
    readonly price: number;
    readonly code: string;
}