import { Injectable } from '@nestjs/common';
import { UserService } from '../users/services/user.service';
import { JwtService} from '@nestjs/jwt'
import { SecureService } from '../users/services/secure.service';
import { UserInterface } from '../users/interfaces/user.interface';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private secure: SecureService
        ) {}
    
    async validateUser(userEmail: string, pass: string): Promise<UserInterface | null> {
        const user = await this.userService.getUserByEmail(userEmail);
        if(user && await this.secure.compare(pass, user.password)) {
            return user
        }
        return null
    }

    async login(mail: string, pass: string) {
        const user = await this.validateUser(mail, pass)
        if(user && user.emailVerified)
        {
            const payload = {username: user.email, sub: user['_id']};
            return {
                name: user.name,
                email: user.email,
                phone: user.phone,
                favorites: user.favorites,
                id: user['_id'],
                // eslint-disable-next-line @typescript-eslint/camelcase
                access_token: this.jwtService.sign(payload)
            }     
        }
        return null
    }
}
