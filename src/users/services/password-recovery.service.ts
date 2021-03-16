import { Injectable } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { MailService } from '../../mail/services/mail.service';

@Injectable()
export class PasswordRecoveryService {
    constructor(
        private usersDbService: UsersDbService,
        private mailService: MailService
    ){}
    makeToken(length) {
        let result = '';
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
    
    async recoverRequest(email:string): Promise<boolean> {
        const user = await this.usersDbService.findUserByEmail(email);
        if(user && user.emailVerified){
            user.passwordRecovery.token = this.makeToken(128);
            user.passwordRecovery.date = new Date().toString();
            const updatedUser = await this.usersDbService.setPasswordRecoveryToken(user);
            this.mailService.sendPasswordRecovery(user);
            return true
        }
        return false
    }

    async checkToken(token: string): Promise<boolean> {
        const user = await this.usersDbService.findUserByPassRecToken(token);
        if(user) {
            return true
        }
        return false
    }
    
    async setNewPassword(password: string, token: string): Promise<boolean> {
        const user = await this.usersDbService.setNewPasswordByRecoveryToken(password, token);
        if(user){
            return true
        }
        return false
    }
}
