import { mailAdress, ownerMail } from './../../environment';
import { WholesaleRequestInterface } from './../../users/interfaces/wholesale-request.interface';
import { CallRequestInterface } from './../../users/interfaces/call-request.interface';
import { OilChooseInterface } from './../../users/interfaces/oil-choose.interface';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { OrderDB } from '../../users/interfaces/order.interface';
import { EmailTokenInterface } from '../../users/interfaces/email-token.interface';
import { UserInterface } from '../../users/interfaces/user.interface';
import { url } from '../../environment';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService
    ) {}

    storeMail = mailAdress;
    helperEmail = mailAdress;
    emailVerificationUrl = `${url}verification/`;
    passRecoveryUrl = `${url}recovery/`
    shopName = 'ROWE Shop'

    sendToStore(order: OrderDB): void{
        this.mailerService.sendMail({
            to: ownerMail,
            from: this.storeMail,
            subject: this.getOrderNumber(order),
            text: this.makeMailText(order),
        }).then()
    }

    sendToClient(order: OrderDB): void{
        this.mailerService.sendMail({
            to: order.mail,
            from: this.storeMail,
            subject: `Магазин ${this.shopName} ${this.getOrderNumber(order)}`,
            text: `Данный адрес электронной почты был указан при заказе в магазине ROWE Shop, ниже подрборная информация \n${this.makeMailText(order)}`
        })
    }

    sendEmailVerification(email: string, emailToken: EmailTokenInterface):void {
        this.mailerService.sendMail({
            to: email,
            from: this.storeMail,
            subject: `${this.shopName} подтверждение почты`,
            text: this.makeMailVerifictaionText(email, emailToken)
        })
    }

    sendPasswordRecovery(user: UserInterface): void {
        this.mailerService.sendMail({
            to: user.email,
            from: this.storeMail,
            subject: `Восстановление пароля ${this.shopName}`,
            text: this.makePassRecoveryText(user.passwordRecovery.token)
        })
    }

    sendCallRequest(info: CallRequestInterface): void {
        this.mailerService.sendMail({
            to: this.helperEmail,
            from: this.storeMail,
            subject: 'Запрос звонка',
            text: `Номер: ${info.name}, Имя: ${info.phone}`
        })
    }

    sendOilChooseRequest(info: OilChooseInterface): void {
        this.mailerService.sendMail({
            to: this.helperEmail,
            from: this.storeMail,
            subject: 'Запрос подбора масла',
            text: `Марка: ${info.carBrand}\nМодель: ${info.carModel}\nГод выпуска: ${info.year}\nДвигатель: ${info.engine}\nТрансмиссия:${info.transmission}\nИмя: ${info.name}\nТелефон: ${info.phone}`
        })
    }

    sendWholesaleRequest(info: WholesaleRequestInterface): void {
        this.mailerService.sendMail({
            to: this.helperEmail,
            from: this.storeMail,
            subject: 'Запрос оптового прайса',
            text: `Имя: ${info.name}\nКомпания: ${info.company}\nИНН: ${info.inn}\nПочта: ${info.email}\nТелефон: ${info.phone}`
        })
    }

    private makeMailText(order: OrderDB): string{
        const msg = [];
        let totalSum = 0;
        msg[0] = `Заказ № ${order.number}`;
        msg[1] = `Дата: ${order.date}`
        msg[2] = `Имя: ${order.name}`;
        msg[3] = `Телефон ${order.phone}`;
        msg[4] = order.delivery === 'pickup' ? 'Доставка: Самовывоз' : `Адрес доставки: ${order.adress}`;
        msg[5] = 'Заказ:'
        order.cart.forEach((vl, i) => {
            totalSum += (vl.count * vl.product.price)
            msg.push(`${i + 1}. ${vl.product.code} - ${vl.product.name} ${vl.product.pack}л - ${vl.count}шт - ${vl.product.price}руб за 1шт - ${vl.count * vl.product.price}руб`)})
        msg.push(`ИТОГО:${totalSum}руб`);
        return msg.join('\n');
        }

    private getOrderNumber(order: OrderDB): string{
        return `Заказ №${order.number}`
    }

    private makeMailVerifictaionText(email: string, emailToken: EmailTokenInterface): string {
        const msg = [];
        msg[0] = `Кто-то указал ${email} при регистрации в ${this.shopName}, если это Вы то перейдите по ссылке ниже для подвтерждения регистрации`
        msg[1] = `${this.emailVerificationUrl}${emailToken.token}`
        return msg.join('\n')
    }

    private makePassRecoveryText(token: string):string {
        const msg = [];
        msg[0] = `Кто-то запросил восставнление пароля Вашего аккаунта в ${this.shopName}, для продолжение перейдите по ссылке ниже`;
        msg[1] = `${this.passRecoveryUrl}${token}`;
        return msg.join('\n')
    }

}
