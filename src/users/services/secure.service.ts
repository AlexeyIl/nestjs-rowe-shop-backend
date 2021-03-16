import { Injectable } from '@nestjs/common';
import { compare, hash } from '../../../node_modules/bcrypt';


@Injectable()
export class SecureService {
    saltRounds = 10;
    async genHash(pass: string): Promise<string> {
        return hash(pass, this.saltRounds)
    }

    async compare(pass: string, hash: string): Promise<boolean> {
        return compare(pass, hash)
    }
}
