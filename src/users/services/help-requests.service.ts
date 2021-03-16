import { MailService } from './../../mail/services/mail.service';
import { WholesaleRequestInterface } from '../interfaces/wholesale-request.interface';
import { OilChooseInterface } from '../interfaces/oil-choose.interface';
import { CallRequestInterface } from '../interfaces/call-request.interface';
import { WholesaleRequestInterfaceDB } from './../interfaces/wholesale-request.interface';
import { OilChooseInterfaceDB } from './../interfaces/oil-choose.interface';
import { CallRequestInterfaceDB } from './../interfaces/call-request.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class HelpRequestsService {
    constructor(
        @InjectModel('Call Request') private readonly CallRequestModel: Model<CallRequestInterfaceDB>,
        @InjectModel('Oil Choose Help') private readonly OilChooseModel: Model<OilChooseInterfaceDB>,
        @InjectModel('Wholesale Request') private readonly WholesaleRequestModel: Model<WholesaleRequestInterfaceDB>,
        private mailServce: MailService
    ) {}

    async addOilChooseRequestDB(request: OilChooseInterface): Promise<OilChooseInterface> {
        const req = new this.OilChooseModel(Object.assign(request, {date: new Date()}));
        if(req) {
            this.mailServce.sendOilChooseRequest(request);
        }
        return req.save()
    }

    async addCallRequestDB(request: CallRequestInterface): Promise<CallRequestInterface> {
        const req = new this.CallRequestModel(Object.assign(request, {date: new Date()}));
        if(req) {
            this.mailServce.sendCallRequest(request);
        }
        return req.save();
    }

    async addWholesaleRequestDB(request: WholesaleRequestInterface): Promise<WholesaleRequestInterface> {
        const req = new this.WholesaleRequestModel(Object.assign(request, {date: new Date()}));
        if(req) {
            this.mailServce.sendWholesaleRequest(request);
        }
        return req.save();
    }


}
