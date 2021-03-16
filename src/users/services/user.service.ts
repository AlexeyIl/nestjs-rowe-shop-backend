import { NoLoggedUserInterface } from './../interfaces/no-logged-user.interface';
import { Injectable } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { NoLoggedUserDB } from '../interfaces/no-logged-user.interface';
import { UserInterface } from '../interfaces/user.interface';
import { SecureService } from './secure.service';
import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EmailVerificationService } from './email-verification.service';
import { MailService } from '../../mail/services/mail.service';
import { PasswordRecoveryService } from './password-recovery.service';


@Injectable()
export class UserService {

    constructor(
        private userDBService: UsersDbService,
        private secure: SecureService,
        private emailVerificationService: EmailVerificationService,
        private mailService: MailService,
        private passwordRecoveryService: PasswordRecoveryService
    ){}
   
    private createToken(): string{
        let dt = new Date().getTime();
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    async checkNotLoggedUser(token: string): Promise<NoLoggedUserDB> {
        const user: NoLoggedUserDB = await this.userDBService.getNotLoggedUser(token);
        if(user) {
            return user
        } else if(!user) {
            return this.saveTokenNotLoggedUser()
        }
    }

    async saveTokenNotLoggedUser(): Promise<NoLoggedUserDB> {
        let token = this.createToken();
        while(await this.userDBService.getNotLoggedUser(token)){
            token = this.createToken();
        }
        return this.userDBService.addNotLoggedUser({
            favorites: [],
            token: token,
            date: new Date().toString()
        })
    }

    async updateNotLoggedUser(user: NoLoggedUserInterface): Promise<NoLoggedUserDB> {
        return this.userDBService.updateNotLoggedUser(user)
    }

    async updateNotLoggedUserFavorites(user: NoLoggedUserInterface): Promise<NoLoggedUserDB> {
        return this.userDBService.updateNotLoggedUserFavorites(user)
    }

    async getUser(id: string): Promise<UserInterface | undefined> {
        return this.userDBService.findUserById(id)
    }

    async getUserByEmail(email: string): Promise<UserInterface | undefined> {
        return this.userDBService.findUserByEmail(email)
    }

    async addUser(user: UserInterface): Promise<UserInterface | undefined> {
        user.email = user.email.toLocaleLowerCase();
        user.date = new Date().toString()
        user.group = 'user';
        user.favorites = user.favorites;
        user.password = await this.secure.genHash(user.password);
        user.emailToken = {
            token: this.emailVerificationService.makeid(128),
            date: new Date().toString()
        }
        user.emailVerified = false;
        return  from(this.userDBService.addUser(user)).pipe(
            map((vl: UserInterface | undefined) => {
                // vl ? vl.password = '' : vl;
                return vl
            }),
            tap((vl) => {
                if(vl) {
                    this.mailService.sendEmailVerification(vl.email, vl.emailToken)
                }
            })
            ).toPromise()
    }

    async updateLoggedUser(id: string, cart): Promise<UserInterface> {
        return this.userDBService.updateLoggedUser(id, cart)
    }

    async updateUserFavorites(id: string, favorites: [string]): Promise<UserInterface> {
        return this.userDBService.updateLoggedUserFavorites(id, favorites)
    }
    
    async checkIsAdmin(id: string): Promise<boolean> {
        const user = await this.userDBService.findUserById(id)
        if(user.group === 'admin'){
            return true
        }
        return false
    }

    async passwordRecoveryReq(email: string): Promise<boolean> {
        return this.passwordRecoveryService.recoverRequest(email)
    }

    async checkRecoveryToken(token: string): Promise<boolean> {
        return this.passwordRecoveryService.checkToken(token)
    }

    async setNewPasswordByRecovery(password: string, token: string): Promise<boolean> {
        const newPassword = await this.secure.genHash(password)
        return this.passwordRecoveryService.setNewPassword(newPassword, token)
    }

    async updateUserInfo(userId: string, newUser: UserInterface): Promise <UserInterface> {
        const user = await this.userDBService.findUserById(userId);
        for (const key in newUser) {
            if (Object.prototype.hasOwnProperty.call(newUser, key)) {
                const element = newUser[key];
                if(element && key === 'email' && element != user['email'] && !(await this.userDBService.findUserByEmail(newUser.email))) {
                    user['email'] = element
                }
                if(element && key != 'email' && key != 'password' && element != user[key]) {
                    user[key] = element        
                }
                if(key === 'password' && element) {
                    user.password = await this.secure.genHash(newUser.password);
                }
            }
        }
        const updatedUser = await this.userDBService.updateUser(userId, user);
        return updatedUser
    }
}
