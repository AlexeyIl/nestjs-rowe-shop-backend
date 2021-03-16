import { Document } from 'mongoose';

export interface ProductDB extends Document {
    readonly ABC: number;
    readonly code: string;
    readonly pack: number;
    readonly box: number;
    readonly weight: number;
    readonly price: number;
    readonly category: string;
    readonly group: string;
    readonly name: string;
    readonly discription: string;
    readonly pass: string;
    readonly tech: string;
    readonly img: string;
    readonly sae:string;
    readonly fullDiscription?: string;
    readonly using?: string | null;
    readonly benefits?: string | null;
    readonly recomendation?: string | null;
    readonly instructions?: string | null;
    readonly quantity?: number | null
    readonly approvs: string[] | null;
    readonly approvsEqual: string[] | null;
    readonly approvsRecomendation: string[] | null

}