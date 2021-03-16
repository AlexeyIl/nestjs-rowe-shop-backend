import { OrderDB } from "../interfaces/order.interface";

export class CreateUserDto {
    name: string;
    date: string;
    email: string;
    password: string;
    phone: string;
    orders?: [OrderDB];
    group: string;
    favorites?: [string];
}