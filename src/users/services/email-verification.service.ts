import { Injectable } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class EmailVerificationService {
  expiresIn = 172800000 

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async verifyUser(emailToken: string): Promise<UserInterface>{
      let user = await this.usersDbService.findByEmailToken(emailToken);
      if(user ? user.emailVerified : false) {
        return user
      }
      if(user ? !user.emailVerified : false) {
        user = await this.usersDbService.verifyEmail(emailToken);
        return user
      }
      return user
  }

  constructor(
      private usersDbService: UsersDbService
  ) {}
}
