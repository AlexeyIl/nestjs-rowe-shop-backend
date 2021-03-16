import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RateService {
    constructor(
        private https: HttpService
    ) {}

    getEurRate(): Observable<any>{
        return this.https.get('https://www.cbr-xml-daily.ru/daily_json.js').pipe(map(vl => vl.data.Valute.EUR.Value))
    }
}
