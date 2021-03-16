import { ProductInterface } from 'src/catalog/interfaces/product.interface';

export interface CartItemInterface {
    readonly count?: number,
    readonly product?: ProductInterface
}