import { ProductInterface } from '../../catalog/interfaces/product.interface';

export class CreateNoLoggedUserDto {
    token: string;
    date: string;
    favorites?: string[];
    cart?: [{
        count: number,
        product: ProductInterface
    }]

}