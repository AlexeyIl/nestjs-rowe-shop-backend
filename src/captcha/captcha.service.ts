import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class CaptchaService {
    constructor(
        private httpService: HttpService
    ){}
    
    secret = ""
}
